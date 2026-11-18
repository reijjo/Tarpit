use crate::{
    features::bets::handlers::{create_bet, get_bet_options, get_bets},
    middleware::require_auth::require_auth,
    state::AppState,
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
        .route("/", get(get_bets).post(create_bet))
        .route("/options", get(get_bet_options))
        .merge(categories::router())
        .merge(bookmakers::router())
        .merge(tippers::router())
        .route_layer(middleware::from_fn(require_auth))
}
