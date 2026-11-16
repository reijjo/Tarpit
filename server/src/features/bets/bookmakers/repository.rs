use sqlx::PgPool;

use super::types::Bookmaker;

pub async fn find_user_bookmakers(
    db: &PgPool,
    user_id: i64,
) -> Result<Vec<Bookmaker>, sqlx::Error> {
    sqlx::query_as::<_, Bookmaker>(
        "SELECT b.id, b.name
         FROM bookmakers b
         JOIN user_bookmakers ub ON ub.bookmaker_id = b.id
         WHERE ub.user_id = $1
         ORDER BY b.name",
    )
    .bind(user_id)
    .fetch_all(db)
    .await
}

pub async fn find_or_create_user_bookmaker(
    db: &PgPool,
    user_id: i64,
    name: &str,
) -> Result<(i64, bool), sqlx::Error> {
    let mut tx = db.begin().await?;

    sqlx::query(
        "INSERT INTO bookmakers (name)
         VALUES ($1)
         ON CONFLICT (name) DO NOTHING",
    )
    .bind(name)
    .execute(&mut *tx)
    .await?;

    let bookmaker_id: i64 = sqlx::query_scalar("SELECT id FROM bookmakers WHERE name = $1")
        .bind(name)
        .fetch_one(&mut *tx)
        .await?;

    let result = sqlx::query(
        "INSERT INTO user_bookmakers (user_id, bookmaker_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, bookmaker_id) DO NOTHING",
    )
    .bind(user_id)
    .bind(bookmaker_id)
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok((bookmaker_id, result.rows_affected() == 1))
}
