use std::time::Duration;

use axum::{Router, extract::Request, response::Response};
use tower_http::trace::TraceLayer;

pub fn request_logger(router: Router) -> Router {
    router.layer(
        TraceLayer::new_for_http()
            .make_span_with(|req: &Request| {
                tracing::info_span!(
                    "http",
                    method = %req.method(),
                    uri = %req.uri()
                )
            })
            .on_request(())
            .on_response(|res: &Response, duration: Duration, _: &tracing::Span| {
                tracing::info!("{} ({} ms)", res.status().as_u16(), duration.as_millis());
            })
            .on_eos(())
            .on_failure(()),
    )
}
