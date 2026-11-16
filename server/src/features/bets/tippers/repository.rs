use sqlx::PgPool;

use super::types::Tipper;

pub async fn find_user_tippers(db: &PgPool, user_id: i64) -> Result<Vec<Tipper>, sqlx::Error> {
    sqlx::query_as::<_, Tipper>(
        "SELECT t.id, t.name
         FROM tippers t
         JOIN user_tippers ut ON ut.tipper_id = t.id
         WHERE ut.user_id = $1
         ORDER BY t.name",
    )
    .bind(user_id)
    .fetch_all(db)
    .await
}

pub async fn find_or_create_user_tipper(
    db: &PgPool,
    user_id: i64,
    name: &str,
) -> Result<(i64, bool), sqlx::Error> {
    let mut tx = db.begin().await?;

    sqlx::query(
        "INSERT INTO tippers (name)
         VALUES ($1)
         ON CONFLICT (name) DO NOTHING",
    )
    .bind(name)
    .execute(&mut *tx)
    .await?;

    let tipper_id: i64 = sqlx::query_scalar("SELECT id FROM tippers WHERE name = $1")
        .bind(name)
        .fetch_one(&mut *tx)
        .await?;

    let result = sqlx::query(
        "INSERT INTO user_tippers (user_id, tipper_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, tipper_id) DO NOTHING",
    )
    .bind(user_id)
    .bind(tipper_id)
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok((tipper_id, result.rows_affected() == 1))
}
