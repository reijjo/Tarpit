use crate::middleware::request_logger::request_logger;
use axum::{Router, routing::get};

pub fn create_app() -> Router {
    let app = Router::new().route("/", get(|| async { "Hello world" }));

    request_logger(app)
}
