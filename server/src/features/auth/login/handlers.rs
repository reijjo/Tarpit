use axum::{
    Json,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
};

use crate::{
    errors::AppError,
    state::AppState,
    types::{api_response::ApiResponse, user::User},
    utils::{json::parse_json, validation::validate_payload},
};

use super::types::LoginRequest;

pub async fn login_handler(
    State(_state): State<AppState>,
    payload: Result<Json<LoginRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<User>>), AppError> {
    let mut payload = parse_json(payload)?;

    payload.login = payload.login.trim().to_lowercase();

    validate_payload(&payload, "Invalid credentials.")?;

    // Check if user exists

    // Check if password is ok

    // Check if user is verified (COMING LATER AFTER EMAIL VERIFICATION)

    // Create session or what?

    print!("Login payload: {:#?}", payload);

    let user = User {
        id: 434343,
        email: "test@ukk.com".to_string(),
        username: "testuser33".to_string(),
        role: "guest".to_string(),
    };

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(
            user,
            Some("Logging you in...".to_string()),
        )),
    ))
}
