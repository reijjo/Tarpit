use tower_sessions::Session;

use crate::errors::{AppError, ErrorDetails};

pub async fn logout(session: &Session) -> Result<(), AppError> {
    session.flush().await.map_err(|error| {
        tracing::error!("Failed to clear session: {error}");
        AppError::Internal(ErrorDetails {
            error: "SESSION_ERROR".to_string(),
            message: Some("Unable to log out.".to_string()),
        })
    })
}
