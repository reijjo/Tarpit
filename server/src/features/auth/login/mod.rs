use axum::{Router, routing::post};

use crate::state::AppState;

pub mod handlers;
pub mod types;

pub fn router() -> Router<AppState> {
    Router::new().route("/login", post(handlers::login_handler))
}
