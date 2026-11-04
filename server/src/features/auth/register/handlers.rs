use axum::{
    Json,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
};

use crate::{
    errors::AppError,
    features::auth::register::services::register_user,
    state::AppState,
    types::api_response::ApiResponse,
    utils::{json::parse_json, validation::validate_payload},
};

use super::types::RegisterRequest;

pub async fn register_handler(
    State(state): State<AppState>,
    payload: Result<Json<RegisterRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<String>>), AppError> {
    let mut payload = parse_json(payload)?;

    payload.email = payload.email.trim().to_lowercase();
    payload.username = payload.username.trim().to_lowercase();

    validate_payload(&payload, "Invalid registration details.")?;

    register_user(&state.db, &payload).await?;

    Ok((
        StatusCode::CREATED,
        Json(ApiResponse::success(payload.email, None)),
    ))
}
