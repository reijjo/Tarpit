use sqlx::PgPool;

use crate::errors::{AppError, ErrorDetails};

use super::{
    repository::{find_or_create_user_category, find_user_categories},
    types::{BetCategory, BetCategoryRequest},
};

pub async fn get_user_categories(db: &PgPool, user_id: i64) -> Result<Vec<BetCategory>, AppError> {
    find_user_categories(db, user_id).await.map_err(|error| {
        tracing::error!("Failed to fetch user categories: {error}");

        AppError::Internal(ErrorDetails {
            error: "DATABASE_ERROR".to_string(),
            message: Some("Unable to fetch categories.".to_string()),
        })
    })
}

pub async fn create_user_category(
    db: &PgPool,
    user_id: i64,
    payload: &BetCategoryRequest,
) -> Result<(BetCategory, bool), AppError> {
    let name = payload.name.trim().to_lowercase();

    let (category_id, created) = find_or_create_user_category(db, user_id, &name)
        .await
        .map_err(|error| {
            tracing::error!("Failed to create user category: {error}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to add category.".to_string()),
            })
        })?;

    Ok((
        BetCategory {
            id: category_id,
            name,
        },
        created,
    ))
}
