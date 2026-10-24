use axum::{Json, extract::State};
use chrono::Utc;

use crate::{state::AppState, types::api_response::ApiResponse};

use super::types::HealthResponse;

pub async fn health_handler(State(state): State<AppState>) -> Json<ApiResponse<HealthResponse>> {
    let data = HealthResponse {
        status: "I'm fine.",
        timestamp: Utc::now().to_rfc3339(),
        uptime_seconds: state.start_time.elapsed().as_secs(),
        version: env!("CARGO_PKG_VERSION"),
    };

    Json(ApiResponse::success(data))
}
