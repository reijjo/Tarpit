use sqlx::PgPool;

use crate::features::auth::login::types::LoginUser;

pub async fn find_user_by_username(
    db: &PgPool,
    username: &str,
) -> Result<Option<LoginUser>, sqlx::Error> {
    sqlx::query_as::<_, LoginUser>(
        "SELECT id, email, username, password_hash, verified, role
         FROM users
         WHERE LOWER(username) = LOWER($1)",
    )
    .bind(username)
    .fetch_optional(db)
    .await
}

pub async fn find_user_by_email(
    db: &PgPool,
    email: &str,
) -> Result<Option<LoginUser>, sqlx::Error> {
    sqlx::query_as::<_, LoginUser>(
        "SELECT id, email, username, password_hash, verified, role
         FROM users
         WHERE LOWER(email) = LOWER($1)",
    )
    .bind(email)
    .fetch_optional(db)
    .await
}
