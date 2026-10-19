use axum::{Router, routing::get};

pub fn create_app() -> Router {
    Router::new().route("/", get(|| async { "Hello world" }))
}
