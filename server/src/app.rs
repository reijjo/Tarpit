use crate::{
    errors::unkown_endpoint,
    features::{auth, health, ready},
    middleware::request_logger::request_logger,
    state::AppState,
};
use axum::Router;
use sqlx::PgPool;
use tower_sessions::SessionManagerLayer;
use tower_sessions_sqlx_store::PostgresStore;

pub fn create_app(pool: PgPool, session_layer: SessionManagerLayer<PostgresStore>) -> Router {
    let state = AppState::new(pool);

    let api = Router::new().nest("/auth", auth::router());

    let app = Router::new()
        .merge(health::router())
        .merge(ready::router())
        .nest("/api/v1", api)
        .fallback(unkown_endpoint)
        .with_state(state)
        .layer(session_layer);

    request_logger(app)
}
