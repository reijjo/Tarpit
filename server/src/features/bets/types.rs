#![allow(dead_code)]

use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::types::Decimal;
use validator::Validate;

use super::enums::{BetStatus, BetType, FinalType};
use super::validators::{validate_bet_leg, validate_decimal, validate_name_length};
use super::{bookmakers::types::Bookmaker, categories::types::BetCategory, tippers::types::Tipper};

// -------------------
// Bets
// -------------------
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Bet {
    pub id: i64,
    pub user_id: i64,
    pub stake: Decimal,
    pub final_odds: Decimal,
    pub final_type: FinalType,
    pub bookmaker_id: Option<i64>,
    pub tipper_id: Option<i64>,
    pub status: BetStatus,
    pub notes: Option<String>,
    pub freebet: bool,

    #[sqlx(skip)]
    pub legs: Vec<BetLeg>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BetRequest {
    #[validate(custom(function = "validate_decimal"))]
    pub stake: Decimal,

    #[validate(custom(function = "validate_decimal"))]
    pub final_odds: Decimal,
    pub final_type: FinalType,

    #[validate(custom(function = "validate_name_length"))]
    pub bookmaker: Option<String>,

    #[validate(custom(function = "validate_name_length"))]
    pub tipper: Option<String>,

    #[validate(length(
        max = 255,
        code = "NOTES_TOO_LONG",
        message = "Max 255 characters in notes"
    ))]
    pub notes: Option<String>,

    #[serde(default)]
    pub freebet: bool,

    #[serde(default)]
    #[validate(length(
        min = 1,
        code = "NO_BET_LEGS",
        message = "Bet must contain at least one leg"
    ))]
    #[validate(nested)]
    pub legs: Vec<BetLegRequest>,
}

// -------------------
// Bet legs
// -------------------
#[derive(Debug, Serialize, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct BetSelection {
    #[validate(length(min = 1, code = "INVALID_SELECTION_ID", message = "Selection problems"))]
    pub id: String,

    #[validate(length(
        min = 1,
        max = 100,
        code = "INVALID_SELECTION",
        message = "Selection msut be between 1 and 100 characters"
    ))]
    pub selection: String,
    pub result: Option<BetStatus>,
}

#[derive(Debug, Serialize, Deserialize, Validate, sqlx::FromRow)]
#[serde(rename_all = "camelCase")]
pub struct BetLeg {
    pub id: i64,
    pub bet_id: i64,
    pub category_id: i64,
    pub home_team: String,
    pub away_team: String,
    pub event_date: NaiveDate,
    pub livebet: bool,
    pub odds: Decimal,
    pub bet_type: BetType,

    #[validate(nested)]
    #[sqlx(json)]
    pub selections: Vec<BetSelection>,
    pub home_result: Option<i32>,
    pub away_result: Option<i32>,
    pub result: BetStatus,
}

#[derive(Debug, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
#[validate(schema(function = "validate_bet_leg"))]
pub struct BetLegRequest {
    #[validate(custom(function = "validate_name_length"))]
    pub category: String,

    #[validate(custom(function = "validate_name_length"))]
    pub home_team: String,

    #[validate(custom(function = "validate_name_length"))]
    pub away_team: String,
    pub event_date: NaiveDate,

    #[serde(default)]
    pub livebet: bool,

    #[validate(custom(function = "validate_decimal"))]
    pub odds: Decimal,
    pub bet_type: BetType,

    #[validate(nested)]
    pub selections: Vec<BetSelection>,

    #[validate(range(min = 0, code = "INVALID_HOME_RESULT", message = "Can't be negative"))]
    pub home_result: Option<i32>,

    #[validate(range(min = 0, code = "INVALID_AWAY_RESULT", message = "Can't be negative"))]
    pub away_result: Option<i32>,
    pub result: Option<BetStatus>,
}

// -------------------
// User tippers, categories and bookmakers
// -------------------
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BetOptions {
    pub categories: Vec<BetCategory>,
    pub bookmakers: Vec<Bookmaker>,
    pub tippers: Vec<Tipper>,
}
