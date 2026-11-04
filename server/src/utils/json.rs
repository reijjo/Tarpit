use axum::extract::{Json, rejection::JsonRejection};

use crate::errors::{AppError, ErrorDetails};

pub fn parse_json<T>(payload: Result<Json<T>, JsonRejection>) -> Result<T, AppError> {
    match payload {
        Ok(Json(payload)) => Ok(payload),
        Err(error) => {
            tracing::warn!("JSON problems: {}", error.body_text());

            Err(AppError::BadRequest(ErrorDetails {
                error: "INVALID_JSON".to_string(),
                message: Some("Invalid request body.".to_string()),
            }))
        }
    }
}
