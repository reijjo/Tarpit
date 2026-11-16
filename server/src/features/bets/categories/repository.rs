use sqlx::PgPool;

use super::types::BetCategory;

pub async fn find_user_categories(
    db: &PgPool,
    user_id: i64,
) -> Result<Vec<BetCategory>, sqlx::Error> {
    sqlx::query_as::<_, BetCategory>(
        "SELECT c.id, c.name
         FROM bet_categories c
         JOIN user_categories uc ON uc.category_id = c.id
         WHERE uc.user_id = $1
         ORDER BY c.name",
    )
    .bind(user_id)
    .fetch_all(db)
    .await
}

pub async fn find_or_create_user_category(
    db: &PgPool,
    user_id: i64,
    name: &str,
) -> Result<(i64, bool), sqlx::Error> {
    let mut tx = db.begin().await?;

    sqlx::query(
        "INSERT INTO bet_categories (name)
         VALUES ($1)
         ON CONFLICT (name) DO NOTHING",
    )
    .bind(name)
    .execute(&mut *tx)
    .await?;

    let category_id: i64 = sqlx::query_scalar("SELECT id FROM bet_categories WHERE name = $1")
        .bind(name)
        .fetch_one(&mut *tx)
        .await?;

    let result = sqlx::query(
        "INSERT INTO user_categories (user_id, category_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, category_id) DO NOTHING",
    )
    .bind(user_id)
    .bind(category_id)
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok((category_id, result.rows_affected() == 1))
}
