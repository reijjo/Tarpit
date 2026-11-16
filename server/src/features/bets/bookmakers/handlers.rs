use axum::extract::rejection::JsonRejection;
use axum::{Json, extract::State, http::StatusCode};
use tower_sessions::Session;

use crate::errors::AppError;
use crate::features::bets::bookmakers::services::{create_user_bookmaker, get_user_bookmakers};
use crate::features::bets::bookmakers::types::Bookmaker;
use crate::features::bets::bookmakers::types::BookmakerRequest;
use crate::state::AppState;
use crate::types::api_response::ApiResponse;
use crate::utils::json::parse_json;
use crate::utils::session_user::get_session_user_id;
use crate::utils::validation::validate_payload;

pub async fn get_bookmakers_handler(
    State(state): State<AppState>,
    session: Session,
) -> Result<(StatusCode, Json<ApiResponse<Vec<Bookmaker>>>), AppError> {
    let user_id = get_session_user_id(&session).await?;
    let bookmakers = get_user_bookmakers(&state.db, user_id).await?;

    Ok((StatusCode::OK, Json(ApiResponse::success(bookmakers, None))))
}

pub async fn create_bookmaker_handler(
    State(state): State<AppState>,
    session: Session,
    payload: Result<Json<BookmakerRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<Bookmaker>>), AppError> {
    let payload = parse_json(payload)?;
    validate_payload(&payload, "Invalid bookmaker.")?;

    let user_id = get_session_user_id(&session).await?;
    let (bookmaker, created) = create_user_bookmaker(&state.db, user_id, &payload).await?;
    let status = if created {
        StatusCode::CREATED
    } else {
        StatusCode::OK
    };

    Ok((status, Json(ApiResponse::success(bookmaker, None))))
}
