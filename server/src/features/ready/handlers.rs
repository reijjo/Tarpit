use axum::{Json, extract::State, http::StatusCode};
use std::time::Duration;
use tokio::time::timeout;

use crate::{state::AppState, types::api_response::ApiResponse};

use super::types::ReadyResponse;

pub async fn ready_handler(
    State(state): State<AppState>,
) -> (StatusCode, Json<ApiResponse<ReadyResponse>>) {
    let result = timeout(
        Duration::from_secs(2),
        sqlx::query("SELECT 1").execute(&state.db),
    )
    .await;

    match result {
        Ok(Ok(_)) => (
            StatusCode::OK,
            Json(ApiResponse::success(ReadyResponse {
                status: "All good.",
                database: "Connected.",
            })),
        ),

        Ok(Err(error)) => {
            tracing::error!("Database check failed: {error}");

            (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(ApiResponse::error("SERVICE_UNAVAILABLE")),
            )
        }

        Err(_) => {
            tracing::error!("Database readiness check timed out");

            (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(ApiResponse::error("DATABASE_TIMEOUT")),
            )
        }
    }
}
