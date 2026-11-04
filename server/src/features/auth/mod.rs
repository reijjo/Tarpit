use crate::state::AppState;
use axum::Router;

pub mod login;
pub mod register;

pub fn router() -> Router<AppState> {
    Router::new()
        .merge(register::router())
        .merge(login::router())
}
