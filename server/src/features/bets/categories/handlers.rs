use crate::errors::AppError;
use crate::features::bets::categories::types::BetCategoryRequest;
use crate::utils::json::parse_json;
use crate::utils::session_user::get_session_user_id;
use crate::utils::validation::validate_payload;
use axum::extract::rejection::JsonRejection;
use axum::{Json, extract::State, http::StatusCode};
use tower_sessions::Session;

use crate::{
    features::bets::categories::types::BetCategory, state::AppState,
    types::api_response::ApiResponse,
};

use crate::features::bets::categories::services::{create_user_category, get_user_categories};

pub async fn get_categories_handler(
    State(state): State<AppState>,
    session: Session,
) -> Result<(StatusCode, Json<ApiResponse<Vec<BetCategory>>>), AppError> {
    let user_id: i64 = get_session_user_id(&session).await?;

    let categories = get_user_categories(&state.db, user_id).await?;

    Ok((StatusCode::OK, Json(ApiResponse::success(categories, None))))
}

pub async fn create_category_handler(
    State(state): State<AppState>,
    session: Session,
    payload: Result<Json<BetCategoryRequest>, JsonRejection>,
) -> Result<(StatusCode, Json<ApiResponse<BetCategory>>), AppError> {
    let payload = parse_json(payload)?;

    validate_payload(&payload, "Invalid category.")?;

    let user_id: i64 = get_session_user_id(&session).await?;

    let (category, created) = create_user_category(&state.db, user_id, &payload).await?;

    let status = if created {
        StatusCode::CREATED
    } else {
        StatusCode::OK
    };

    Ok((status, Json(ApiResponse::success(category, None))))
}
