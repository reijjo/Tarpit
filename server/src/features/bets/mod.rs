use crate::{
    features::bets::handlers::get_bets, middleware::require_auth::require_auth, state::AppState,
};
use axum::{Router, middleware, routing::get};

pub mod bookmakers;
pub mod categories;
pub mod enums;
pub mod handlers;
pub mod repository;
pub mod services;
pub mod tippers;
pub mod types;
pub mod validators;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_bets))
        .merge(categories::router())
        .merge(bookmakers::router())
        .merge(tippers::router())
        .route_layer(middleware::from_fn(require_auth))
}
