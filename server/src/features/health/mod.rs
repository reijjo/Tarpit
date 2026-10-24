use axum::{Router, routing::get};

use crate::state::AppState;

pub mod handlers;
pub mod types;

pub fn router() -> Router<AppState> {
    Router::new().route("/health", get(handlers::health_handler))
}
