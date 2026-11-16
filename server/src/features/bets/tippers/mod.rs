use axum::{Router, routing::get};

use crate::{
    features::bets::tippers::handlers::{create_tipper_handler, get_tippers_handler},
    state::AppState,
};

pub mod handlers;
pub mod repository;
pub mod services;
pub mod types;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/tippers",
        get(get_tippers_handler).post(create_tipper_handler),
    )
}
