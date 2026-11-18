use super::{
    bookmakers::repository::find_user_bookmakers,
    categories::repository::find_user_categories,
    repository::{create_bet, find_user_bets},
    tippers::repository::find_user_tippers,
    types::{Bet, BetLegRequest, BetOptions, BetRequest},
};
use crate::errors::{AppError, ErrorDetails};
use crate::features::bets::bookmakers::repository::find_or_create_user_bookmaker;
use crate::features::bets::categories::repository::find_or_create_user_category;
use crate::features::bets::tippers::repository::find_or_create_user_tipper;

use sqlx::PgPool;

pub async fn get_user_bets(db: &PgPool, user_id: i64) -> Result<Vec<Bet>, AppError> {
    let bets = find_user_bets(db, user_id).await.map_err(|err| {
        tracing::error!("Failed to fetch bets: {err}");

        AppError::Internal(ErrorDetails {
            error: "DATABASE_ERROR".to_string(),
            message: Some("Failed to fetch bets".to_string()),
        })
    })?;

    Ok(bets)
}

pub async fn create_user_bet(
    db: &PgPool,
    user_id: i64,
    data: &BetRequest,
) -> Result<Bet, AppError> {
    let bookmaker_id = resolve_bookmaker(db, user_id, data.bookmaker.as_deref()).await?;

    let tipper_id = resolve_tipper(db, user_id, data.tipper.as_deref()).await?;

    let category_ids = resolve_categories(db, user_id, &data.legs).await?;

    let bet = create_bet(db, user_id, data, bookmaker_id, tipper_id, &category_ids).await?;

    Ok(bet)
}

// Helpers
async fn resolve_bookmaker(
    db: &PgPool,
    user_id: i64,
    name: Option<&str>,
) -> Result<Option<i64>, AppError> {
    let Some(name) = name else {
        return Ok(None);
    };

    let name = name.trim().to_lowercase();

    let (id, _) = find_or_create_user_bookmaker(db, user_id, &name).await?;

    Ok(Some(id))
}

async fn resolve_tipper(
    db: &PgPool,
    user_id: i64,
    name: Option<&str>,
) -> Result<Option<i64>, AppError> {
    let Some(name) = name else {
        return Ok(None);
    };

    let name = name.trim().to_lowercase();

    let (id, _) = find_or_create_user_tipper(db, user_id, &name).await?;

    Ok(Some(id))
}

async fn resolve_categories(
    db: &PgPool,
    user_id: i64,
    legs: &[BetLegRequest],
) -> Result<Vec<i64>, AppError> {
    let mut ids = Vec::with_capacity(legs.len());

    for leg in legs {
        let name = leg.category.trim().to_lowercase();

        let (id, _) = find_or_create_user_category(db, user_id, &name).await?;

        ids.push(id);
    }

    Ok(ids)
}

pub async fn get_user_bet_options(db: &PgPool, user_id: i64) -> Result<BetOptions, AppError> {
    let categories = find_user_categories(db, user_id).await?;
    let bookmakers = find_user_bookmakers(db, user_id).await?;
    let tippers = find_user_tippers(db, user_id).await?;

    Ok(BetOptions {
        categories,
        bookmakers,
        tippers,
    })
}
