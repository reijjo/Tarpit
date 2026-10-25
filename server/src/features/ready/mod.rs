mod handlers;
mod types;

use axum::routing::{Router, get};

use crate::state::AppState;

pub fn router() -> Router<AppState> {
    Router::new().route("/ready", get(handlers::ready_handler))
}
