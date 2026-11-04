use axum::{Router, routing::post};

use crate::state::AppState;

pub mod handlers;
pub mod repository;
pub mod services;
pub mod types;
pub mod validators;

pub fn router() -> Router<AppState> {
    Router::new().route("/register", post(handlers::register_handler))
}
