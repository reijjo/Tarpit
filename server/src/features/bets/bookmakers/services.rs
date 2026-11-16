use sqlx::PgPool;

use crate::errors::{AppError, ErrorDetails};

use super::{
    repository::{find_or_create_user_bookmaker, find_user_bookmakers},
    types::{Bookmaker, BookmakerRequest},
};

pub async fn get_user_bookmakers(db: &PgPool, user_id: i64) -> Result<Vec<Bookmaker>, AppError> {
    find_user_bookmakers(db, user_id).await.map_err(|error| {
        tracing::error!("Failed to fetch user bookmakers: {error}");

        AppError::Internal(ErrorDetails {
            error: "DATABASE_ERROR".to_string(),
            message: Some("Unable to fetch bookmakers.".to_string()),
        })
    })
}

pub async fn create_user_bookmaker(
    db: &PgPool,
    user_id: i64,
    payload: &BookmakerRequest,
) -> Result<(Bookmaker, bool), AppError> {
    let name = payload.name.trim().to_lowercase();

    let (bookmaker_id, created) = find_or_create_user_bookmaker(db, user_id, &name)
        .await
        .map_err(|error| {
            tracing::error!("Failed to create user bookmaker: {error}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to add bookmaker.".to_string()),
            })
        })?;

    Ok((
        Bookmaker {
            id: bookmaker_id,
            name,
        },
        created,
    ))
}
