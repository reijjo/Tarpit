use crate::types::api_response::ApiResponse;
use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
pub struct ErrorDetails {
    pub error: String,
    pub message: Option<String>,
}

#[allow(dead_code)]
pub enum AppError {
    Internal(ErrorDetails),           // 500
    BadRequest(ErrorDetails),         // 400
    NotFound(ErrorDetails),           // 404
    ServiceUnavailable(ErrorDetails), // 503
    Conflict(ErrorDetails),           // 409
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, details) = match self {
            Self::Internal(details) => (StatusCode::INTERNAL_SERVER_ERROR, details),
            Self::BadRequest(details) => (StatusCode::BAD_REQUEST, details),
            Self::NotFound(details) => (StatusCode::NOT_FOUND, details),
            Self::ServiceUnavailable(details) => (StatusCode::SERVICE_UNAVAILABLE, details),
            Self::Conflict(details) => (StatusCode::CONFLICT, details),
        };

        (
            status,
            Json(ApiResponse::<()>::Error {
                success: false,
                error: details.error,
                message: details.message,
            }),
        )
            .into_response()
    }
}

pub async fn unkown_endpoint() -> AppError {
    AppError::NotFound(ErrorDetails {
        error: "NOT_FOUND".to_string(),
        message: Some("Nothing to see.".to_string()),
    })
}
