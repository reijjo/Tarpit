use axum::{Router, routing::get};

use crate::{
    features::bets::bookmakers::handlers::{create_bookmaker_handler, get_bookmakers_handler},
    state::AppState,
};

pub mod handlers;
pub mod repository;
pub mod services;
pub mod types;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/bookmakers",
        get(get_bookmakers_handler).post(create_bookmaker_handler),
    )
}
