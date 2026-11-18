use axum::{
    Json,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
    response::IntoResponse,
};
use tower_sessions::Session;

use crate::{
    errors::AppError,
    features::bets::services::get_user_bets,
    state::AppState,
    types::api_response::ApiResponse,
    utils::session_user::get_session_user_id,
    utils::{json::parse_json, validation::validate_payload},
};

use super::{
    services::{create_user_bet, get_user_bet_options},
    types::BetRequest,
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

pub async fn create_bet(
    State(state): State<AppState>,
    session: Session,
    payload: Result<Json<BetRequest>, JsonRejection>,
) -> Result<impl IntoResponse, AppError> {
    let user_id = get_session_user_id(&session).await?;

    let data = parse_json(payload)?;
    validate_payload(&data, "Invalid bet data.")?;

    let bet = create_user_bet(&state.db, user_id, &data).await?;

    Ok((
        StatusCode::CREATED,
        Json(ApiResponse::success(
            bet,
            Some("Bet created successfully.".to_string()),
        )),
    ))
}

pub async fn get_bet_options(
    State(state): State<AppState>,
    session: Session,
) -> Result<impl IntoResponse, AppError> {
    let user_id = get_session_user_id(&session).await?;

    let options = get_user_bet_options(&state.db, user_id).await?;

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(
            options,
            Some("Your bet options.".to_string()),
        )),
    ))
}
