use sqlx::PgPool;
use std::time::Instant;

#[allow(dead_code)]
#[derive(Clone)]
pub struct AppState {
    pub start_time: Instant,
    pub db: PgPool,
}

impl AppState {
    pub fn new(db: PgPool) -> Self {
        Self {
            start_time: Instant::now(),
            db,
        }
    }
}
