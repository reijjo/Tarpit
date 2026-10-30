use std::env;

pub struct Config {
    pub host: String,
    pub port: u16,
    pub database_url: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenvy::dotenv().ok();

        let host = env::var("HOST").expect("HOST must be set");

        let port = env::var("PORT")
            .expect("PORT must be set")
            .parse::<u16>()
            .expect("PORT must be a valid number");

        let is_test = cfg!(test) || std::env::var("APP_ENV").as_deref() == Ok("test");

        let database_url = if is_test {
            std::env::var("TEST_DATABASE_URL").expect("TEST_DATABASE_URL must be set")
        } else {
            env::var("DATABASE_URL").expect("DATABASE_URL must be set")
        };

        Self {
            host,
            port,
            database_url,
        }
    }

    pub fn address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

// TESTS
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn uses_test_database() {
        let config = Config::from_env();

        assert!(
            config.database_url.contains(":5433/tarpit_test"),
            "Tests must use the test database!"
        );
    }
}
