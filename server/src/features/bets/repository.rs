use super::types::{Bet, BetLeg};
use sqlx::PgPool;

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
