use super::enums::BetStatus;
use super::types::{Bet, BetLeg, BetLegRequest, BetRequest};
use sqlx::types::Json;
use sqlx::{PgPool, Postgres, Transaction};

// ------------
// GET
// ------------
pub async fn find_user_bets(db: &PgPool, user_id: i64) -> Result<Vec<Bet>, sqlx::Error> {
    let mut bets = sqlx::query_as::<_, Bet>(
        "SELECT *
		FROM bets
		WHERE user_id = $1
		ORDER BY created_at DESC, id DESC",
    )
    .bind(user_id)
    .fetch_all(db)
    .await?;

    let legs = find_user_bet_legs(db, user_id).await?;

    for leg in legs {
        if let Some(bet) = bets.iter_mut().find(|bet| bet.id == leg.bet_id) {
            bet.legs.push(leg);
        }
    }

    Ok(bets)
}

pub async fn find_user_bet_legs(db: &PgPool, user_id: i64) -> Result<Vec<BetLeg>, sqlx::Error> {
    sqlx::query_as::<_, BetLeg>(
        "SELECT bl.*
         FROM bet_legs bl
         JOIN bets b ON b.id = bl.bet_id
         WHERE b.user_id = $1
         ORDER BY bl.id",
    )
    .bind(user_id)
    .fetch_all(db)
    .await
}

// ------------
// POST
// ------------
async fn insert_bet(
    tx: &mut Transaction<'_, Postgres>,
    user_id: i64,
    data: &BetRequest,
    bookmaker_id: Option<i64>,
    tipper_id: Option<i64>,
) -> Result<Bet, sqlx::Error> {
    sqlx::query_as::<_, Bet>(
        "INSERT INTO bets (
			user_id, stake, final_odds, final_type, bookmaker_id, tipper_id, notes, freebet
	)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	RETURNING *",
    )
    .bind(user_id)
    .bind(data.stake)
    .bind(data.final_odds)
    .bind(&data.final_type)
    .bind(bookmaker_id)
    .bind(tipper_id)
    .bind(&data.notes)
    .bind(data.freebet)
    .fetch_one(&mut **tx)
    .await
}

async fn insert_bet_leg(
    tx: &mut sqlx::Transaction<'_, sqlx::Postgres>,
    bet_id: i64,
    leg: &BetLegRequest,
    category_id: i64,
) -> Result<BetLeg, sqlx::Error> {
    sqlx::query_as::<_, BetLeg>(
        "INSERT INTO bet_legs (
            bet_id, category_id, home_team, away_team,
            event_date, livebet, odds, bet_type,
            selections, home_result, away_result, result
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12
        )
        RETURNING *",
    )
    .bind(bet_id)
    .bind(category_id)
    .bind(&leg.home_team)
    .bind(&leg.away_team)
    .bind(leg.event_date)
    .bind(leg.livebet)
    .bind(leg.odds)
    .bind(&leg.bet_type)
    .bind(Json(&leg.selections))
    .bind(leg.home_result)
    .bind(leg.away_result)
    .bind(leg.result.as_ref().unwrap_or(&BetStatus::Pending))
    .fetch_one(&mut **tx)
    .await
}

pub async fn create_bet(
    db: &PgPool,
    user_id: i64,
    data: &BetRequest,
    bookmaker_id: Option<i64>,
    tipper_id: Option<i64>,
    category_ids: &[i64],
) -> Result<Bet, sqlx::Error> {
    let mut tx = db.begin().await?;

    let mut bet = insert_bet(&mut tx, user_id, data, bookmaker_id, tipper_id).await?;

    for (leg, category_id) in data.legs.iter().zip(category_ids.iter()) {
        let saved_leg = insert_bet_leg(&mut tx, bet.id, leg, *category_id).await?;

        bet.legs.push(saved_leg);
    }

    tx.commit().await?;

    Ok(bet)
}
