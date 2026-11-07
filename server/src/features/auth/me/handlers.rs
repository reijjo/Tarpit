use crate::errors::AppError;
use crate::state::AppState;
use crate::types::{api_response::ApiResponse, user::User};
use axum::{Json, extract::State, http::StatusCode};
use tower_sessions::Session;

use super::services::get_current_user;

pub async fn me_handler(
    State(state): State<AppState>,
    session: Session,
) -> Result<(StatusCode, Json<ApiResponse<User>>), AppError> {
    let user = get_current_user(&state.db, &session).await?;

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(
            user,
            Some("Yup, it's me.".to_string()),
        )),
    ))
}
