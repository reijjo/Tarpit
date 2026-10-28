use sqlx::{PgPool, types::uuid};

pub async fn email_exists(db: &PgPool, email: &str) -> Result<bool, sqlx::Error> {
    sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE LOWER(email) = $1)")
        .bind(email)
        .fetch_one(db)
        .await
}

pub async fn username_exists(db: &PgPool, username: &str) -> Result<bool, sqlx::Error> {
    sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE LOWER(username) = $1)")
        .bind(username)
        .fetch_one(db)
        .await
}

pub async fn create_user(
    db: &PgPool,
    email: &str,
    username: &str,
    password_hash: &str,
) -> Result<uuid::Uuid, sqlx::Error> {
    sqlx::query_scalar(
        "INSERT INTO users (email, username, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id",
    )
    .bind(email)
    .bind(username)
    .bind(password_hash)
    .fetch_one(db)
    .await
}
