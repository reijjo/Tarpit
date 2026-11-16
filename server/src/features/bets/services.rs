use super::{repository, types::Bet};
use crate::errors::{AppError, ErrorDetails};

use sqlx::PgPool;

pub async fn get_user_bets(db: &PgPool, user_id: i64) -> Result<Vec<Bet>, AppError> {
    let bets = repository::find_user_bets(db, user_id)
        .await
        .map_err(|err| {
            tracing::error!("Failed to fetch bets: {err}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Failed to fetch bets".to_string()),
            })
        })?;

    Ok(bets)
}
