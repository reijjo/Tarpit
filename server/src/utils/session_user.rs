use tower_sessions::Session;

use crate::errors::{AppError, ErrorDetails};

pub async fn get_session_user_id(session: &Session) -> Result<i64, AppError> {
    session
        .get::<i64>("user_id")
        .await
        .map_err(|error| {
            tracing::error!("Failed to read session: {error}");

            AppError::Internal(ErrorDetails {
                error: "SESSION_ERROR".to_string(),
                message: Some("Unable to read session.".to_string()),
            })
        })?
        .ok_or_else(|| {
            AppError::Unauthorized(ErrorDetails {
                error: "UNAUTHORIZED".to_string(),
                message: Some("Please log in first.".to_string()),
            })
        })
}
