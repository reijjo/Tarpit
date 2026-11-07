use axum::{Router, routing::get};

use crate::{features::auth::me::handlers::me_handler, state::AppState};

pub mod handlers;
pub mod services;

pub fn router() -> Router<AppState> {
    Router::new().route("/me", get(me_handler))
}
