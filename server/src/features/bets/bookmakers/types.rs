#![allow(dead_code)]

use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::features::bets::validators::validate_name_length;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Bookmaker {
    pub id: i64,
    pub name: String,
}

#[derive(Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BookmakerRequest {
    #[validate(custom(function = "validate_name_length"))]
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserBookmaker {
    pub user_id: i64,
    pub bookmaker_id: i64,
}
