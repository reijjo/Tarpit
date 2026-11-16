use axum::{Json, extract::State, http::StatusCode, response::IntoResponse};
use tower_sessions::Session;

use crate::{
    errors::AppError, features::bets::services::get_user_bets, state::AppState,
    types::api_response::ApiResponse, utils::session_user::get_session_user_id,
};

pub async fn get_bets(
    State(state): State<AppState>,
    session: Session,
) -> Result<impl IntoResponse, AppError> {
    let user_id = get_session_user_id(&session).await?;

    let bets = get_user_bets(&state.db, user_id).await?;

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(bets, Some("Your bets.".to_string()))),
    ))
}
