use axum::extract::rejection::JsonRejection;
use axum::{Json, extract::State, http::StatusCode};
use tower_sessions::Session;

use crate::errors::AppError;
use crate::features::bets::tippers::services::{create_user_tipper, get_user_tippers};
use crate::features::bets::tippers::types::{Tipper, TipperRequest};
use crate::state::AppState;
use crate::types::api_response::ApiResponse;
use crate::utils::json::parse_json;
use crate::utils::session_user::get_session_user_id;
use crate::utils::validation::validate_payload;

pub async fn get_tippers_handler(
    State(state): State<AppState>,
    session: Session,
) -> Result<(StatusCode, Json<ApiResponse<Vec<Tipper>>>), AppError> {
    let user_id = get_session_user_id(&session).await?;
    let tippers = get_user_tippers(&state.db, user_id).await?;

    Ok((StatusCode::OK, Json(ApiResponse::success(tippers, None))))
}

pub async fn create_tipper_handler(
    State(state): State<AppState>,
    session: Session,
    payload: Result<Json<TipperRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<Tipper>>), AppError> {
    let payload = parse_json(payload)?;
    validate_payload(&payload, "Invalid tipper.")?;

    let user_id = get_session_user_id(&session).await?;
    let (tipper, created) = create_user_tipper(&state.db, user_id, &payload).await?;
    let status = if created {
        StatusCode::CREATED
    } else {
        StatusCode::OK
    };

    Ok((status, Json(ApiResponse::success(tipper, None))))
}
