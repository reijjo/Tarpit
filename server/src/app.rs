use crate::{features::health, middleware::request_logger::request_logger, state::AppState};
use axum::Router;

pub fn create_app() -> Router {
    let state = AppState::new();

    let app = Router::new().merge(health::router()).with_state(state);

    request_logger(app)
}
