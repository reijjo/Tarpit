use crate::{
    errors::unkown_endpoint,
    features::{auth, health, ready},
    middleware::request_logger::request_logger,
    state::AppState,
};
use axum::Router;
use sqlx::PgPool;

pub fn create_app(pool: PgPool) -> Router {
    let state = AppState::new(pool);

    let api = Router::new().nest("/auth", auth::router());

    let app = Router::new()
        .merge(health::router())
        .merge(ready::router())
        .nest("/api/v1", api)
        .fallback(unkown_endpoint)
        .with_state(state);

    request_logger(app)
}
