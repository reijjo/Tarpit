use axum::{
    Json,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
};
use validator::Validate;

use crate::{
    errors::{AppError, ErrorDetails},
    features::auth::services::{create_user, is_email_registered, is_username_registered},
    state::AppState,
    types::api_response::ApiResponse,
};

use super::types::RegisterRequest;

pub async fn register_handler(
    State(state): State<AppState>,
    payload: Result<Json<RegisterRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<String>>), AppError> {
    // Checks if JSON is ok and correct type
    let Json(mut payload) = match payload {
        Ok(json) => json,
        Err(error) => {
            tracing::warn!("Json problems: {}", error.body_text());

            return Err(AppError::BadRequest(ErrorDetails {
                error: "INVALID_JSON".to_string(),
                message: Some("Invalid request body.".to_string()),
            }));
        }
    };

    payload.email = payload.email.trim().to_lowercase();
    payload.username = payload.username.trim().to_lowercase();

    // Checks the fields for errors
    if let Err(errors) = payload.validate() {
        if let Some(validation_error) = errors
            .field_errors()
            .values()
            .next()
            .and_then(|field_errors| field_errors.first())
        {
            let message = validation_error
                .message
                .as_ref()
                .map(|text| text.to_string());

            return Err(AppError::BadRequest(ErrorDetails {
                error: validation_error.code.to_string(),
                message,
            }));
        }

        return Err(AppError::BadRequest(ErrorDetails {
            error: "VALIDATION_ERROR".to_string(),
            message: Some("Invalid registration details.".to_string()),
        }));
    }

    is_email_registered(&state.db, &payload.email).await?;
    is_username_registered(&state.db, &payload.username).await?;

    create_user(&state.db, &payload).await?;

    Ok((
        StatusCode::CREATED,
        Json(ApiResponse::success(payload.email)),
    ))
}
