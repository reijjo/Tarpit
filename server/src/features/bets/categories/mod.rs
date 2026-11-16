use axum::{Router, routing::get};

use crate::{
    features::bets::categories::handlers::{create_category_handler, get_categories_handler},
    state::AppState,
};

pub mod handlers;
pub mod repository;
pub mod services;
pub mod types;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/categories",
        get(get_categories_handler).post(create_category_handler),
    )
}
