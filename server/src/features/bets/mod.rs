use crate::{middleware::require_auth::require_auth, state::AppState};
use axum::{Router, middleware};

pub mod bookmakers;
pub mod categories;
pub mod tippers;
pub mod types;
pub mod validators;

pub fn router() -> Router<AppState> {
    Router::new()
        .merge(categories::router())
        .merge(bookmakers::router())
        .merge(tippers::router())
        .route_layer(middleware::from_fn(require_auth))
}
