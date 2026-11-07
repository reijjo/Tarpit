use sqlx::PgPool;
use tower_sessions::Session;

use crate::{
    errors::{AppError, ErrorDetails},
    features::users::repository::find_user_by_id,
    types::user::User,
};

pub async fn get_current_user(db: &PgPool, session: &Session) -> Result<User, AppError> {
    let session_user_id = session
        .get::<i64>("user_id")
        .await
        .map_err(|error| {
            tracing::error!("Failed to read session: {error}");
            AppError::Internal(ErrorDetails {
                error: "SESSION_ERROR".to_string(),
                message: Some("Unable to read login session.".to_string()),
            })
        })?
        .ok_or_else(|| {
            AppError::Unauthorized(ErrorDetails {
                error: "NOT_AUTHENTICATED".to_string(),
                message: Some("Please log in.".to_string()),
            })
        })?;

    find_user_by_id(db, session_user_id)
        .await
        .map_err(|error| {
            tracing::error!("Failed to load session user: {error}");
            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to load user.".to_string()),
            })
        })?
        .ok_or_else(|| {
            AppError::Unauthorized(ErrorDetails {
                error: "NOT_AUTHENTICATED".to_string(),
                message: Some("Please log in.".to_string()),
            })
        })
}
