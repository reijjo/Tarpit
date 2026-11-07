use axum::{
    Json,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
};
use tower_sessions::Session;

use crate::{
    errors::{AppError, ErrorDetails},
    features::auth::login::services::{
        authenticate_and_create_session, get_login_user, verify_password,
    },
    state::AppState,
    types::{api_response::ApiResponse, user::User},
    utils::{json::parse_json, validation::validate_payload},
};

use super::types::LoginRequest;

pub async fn login_handler(
    State(state): State<AppState>,
    session: Session,
    payload: Result<Json<LoginRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<User>>), AppError> {
    let mut payload = parse_json(payload)?;
    payload.login = payload.login.trim().to_lowercase();

    validate_payload(&payload, "Invalid credentials.")?;

    // Check if user exists
    let login_user = get_login_user(&state.db, &payload.login).await?;

    // Check if password is ok
    let valid_password = verify_password(&payload.password, &login_user.password_hash).await?;

    if !valid_password {
        return Err(AppError::Unauthorized(ErrorDetails {
            error: "INVALID_CREDENTIALS".to_string(),
            message: Some("Wrong password mate.".to_string()),
        }));
    }

    // Check if user is verified (COMING LATER AFTER EMAIL VERIFICATION)

    // Create session
    let user =
        authenticate_and_create_session(&state.db, &session, &payload.login, &payload.password)
            .await?;

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(
            user,
            Some("Logging you in...".to_string()),
        )),
    ))
}
