use crate::{
    features::{health, ready},
    middleware::request_logger::request_logger,
    state::AppState,
};
use axum::Router;
use sqlx::PgPool;

pub fn create_app(pool: PgPool) -> Router {
    let state = AppState::new(pool);

    let app = Router::new()
        .merge(health::router())
        .merge(ready::router())
        .with_state(state);

    request_logger(app)
}
