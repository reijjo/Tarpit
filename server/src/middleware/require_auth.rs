use axum::{extract::Request, middleware::Next, response::Response};
use tower_sessions::Session;

use crate::errors::{AppError, ErrorDetails};

pub async fn require_auth(
    session: Session,
    request: Request,
    next: Next,
) -> Result<Response, AppError> {
    let user_id: Option<i64> = session.get("user_id").await.map_err(|error| {
        tracing::error!("Session error: {error}");

        AppError::Internal(ErrorDetails {
            error: "SESSION_ERROR".to_string(),
            message: Some("Unable to read session.".to_string()),
        })
    })?;

    if user_id.is_none() {
        return Err(AppError::Unauthorized(ErrorDetails {
            error: "UNAUTHORIZED".to_string(),
            message: Some("Please log in first.".to_string()),
        }));
    }

    Ok(next.run(request).await)
}
