use sqlx::PgPool;

use crate::types::user::User;

pub async fn find_user_by_id(db: &PgPool, user_id: i64) -> Result<Option<User>, sqlx::Error> {
    sqlx::query_as::<_, User>("SELECT id, email, username, role FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_optional(db)
        .await
}
