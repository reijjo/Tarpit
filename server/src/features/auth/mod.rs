use crate::state::AppState;
use axum::Router;

pub mod login;
pub mod logout;
pub mod me;
pub mod register;

pub fn router() -> Router<AppState> {
    Router::new()
        .merge(register::router())
        .merge(login::router())
        .merge(logout::router())
        .merge(me::router())
}
