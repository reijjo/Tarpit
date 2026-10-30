use sqlx::{PgPool, postgres::PgPoolOptions};

pub async fn connect_db(database_url: &str) -> Result<PgPool, sqlx::Error> {
    PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
}

// TESTS
#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::Config;

    #[tokio::test]
    async fn test_database_connection() {
        let config = Config::from_env();

        let pool = connect_db(&config.database_url)
            .await
            .expect("Failed to connect to test database");

        sqlx::query("SELECT 1")
            .execute(&pool)
            .await
            .expect("Test database query failed");
    }
}
