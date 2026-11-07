use axum::{Router, routing::post};

use crate::{features::auth::logout::handlers::logout_handler, state::AppState};

pub mod handlers;
pub mod services;

pub fn router() -> Router<AppState> {
    Router::new().route("/logout", post(logout_handler))
}
