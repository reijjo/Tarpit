use axum::{Json, extract::State, http::StatusCode};
use std::time::Duration;
use tokio::time::timeout;

use crate::{
    errors::{AppError, ErrorDetails},
    state::AppState,
    types::api_response::ApiResponse,
};

use super::types::ReadyResponse;

pub async fn ready_handler(
    State(state): State<AppState>,
) -> Result<(StatusCode, Json<ApiResponse<ReadyResponse>>), AppError> {
    let result = timeout(
        Duration::from_secs(2),
        sqlx::query("SELECT 1").execute(&state.db),
    )
    .await;

    match result {
        Ok(Ok(_)) => Ok((
            StatusCode::OK,
            Json(ApiResponse::success(ReadyResponse {
                status: "All good.",
                database: "Connected.",
            })),
        )),

        Ok(Err(error)) => {
            tracing::error!("Database check failed: {error}");

            Err(AppError::ServiceUnavailable(ErrorDetails {
                error: "SERVICE_UNAVAILABLE".to_string(),
                message: Some("Database connection failed.".to_string()),
            }))
        }

        Err(_) => {
            tracing::error!("Database readiness check timed out");

            Err(AppError::ServiceUnavailable(ErrorDetails {
                error: "DATABASE_TIMEOUT".to_string(),
                message: Some("Database readiness check timed out.".to_string()),
            }))
        }
    }
}
