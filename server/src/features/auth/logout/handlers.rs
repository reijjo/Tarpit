use axum::{Json, http::StatusCode};
use tower_sessions::Session;

use crate::{errors::AppError, types::api_response::ApiResponse};

pub async fn logout_handler(
    session: Session,
) -> Result<(StatusCode, Json<ApiResponse<String>>), AppError> {
    super::services::logout(&session).await?;

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success("Logged out.".to_string(), None)),
    ))
}
