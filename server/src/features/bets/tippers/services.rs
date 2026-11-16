use sqlx::PgPool;

use crate::errors::{AppError, ErrorDetails};

use super::{
    repository::{find_or_create_user_tipper, find_user_tippers},
    types::{Tipper, TipperRequest},
};

pub async fn get_user_tippers(db: &PgPool, user_id: i64) -> Result<Vec<Tipper>, AppError> {
    find_user_tippers(db, user_id).await.map_err(|error| {
        tracing::error!("Failed to fetch user tippers: {error}");

        AppError::Internal(ErrorDetails {
            error: "DATABASE_ERROR".to_string(),
            message: Some("Unable to fetch tippers.".to_string()),
        })
    })
}

pub async fn create_user_tipper(
    db: &PgPool,
    user_id: i64,
    payload: &TipperRequest,
) -> Result<(Tipper, bool), AppError> {
    let name = payload.name.trim().to_lowercase();

    let (tipper_id, created) = find_or_create_user_tipper(db, user_id, &name)
        .await
        .map_err(|error| {
            tracing::error!("Failed to create user tipper: {error}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to add tipper.".to_string()),
            })
        })?;

    Ok((
        Tipper {
            id: tipper_id,
            name,
        },
        created,
    ))
}
