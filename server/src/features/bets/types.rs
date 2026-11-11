#![allow(dead_code)]

use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::types::Decimal;
use validator::Validate;

use super::validators::{validate_bet_leg, validate_decimal, validate_name_length};

// -------------------
// Bet categories
// -------------------
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BetCategory {
    pub id: i64,
    pub name: String,
}

#[derive(Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BetCategoryRequest {
    #[validate(custom(function = "validate_name_length"))]
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserCategory {
    pub user_id: i64,
    pub category_id: i64,
}

// -------------------
// Bookmaker
// -------------------
#[derive(Debug, Serialize, Deserialize)]
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

// -------------------
// Tippers
// -------------------
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Tipper {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct TipperRequest {
    #[validate(custom(function = "validate_name_length"))]
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserTipper {
    pub user_id: i64,
    pub tipper_id: i64,
}

// -------------------
// Bets
// -------------------
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum BetStatus {
    Pending,
    Won,
    Lost,
    HalfWon,
    HalfLost,
    Push,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FinalType {
    Single,
    Double,
    Treble,
    #[serde(rename = "4_fold")]
    FourFold,
    #[serde(rename = "parlay_5_plus")]
    Parlay5Plus,
    MultipleCorrectScores,
}

#[derive(Debug, Serialize, Deserialize)]
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
    pub bookmaker_id: Option<i64>,
    pub tipper_id: Option<i64>,

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
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BetSelection {
    pub id: String,
    pub selection: String,
    pub result: Option<BetStatus>,
}

#[derive(Debug, Serialize, Deserialize)]
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
    pub selections: Vec<BetSelection>,
    pub home_result: Option<i32>,
    pub away_result: Option<i32>,
    pub result: BetStatus,
}

#[derive(Debug, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
#[validate(schema(function = "validate_bet_leg"))]
pub struct BetLegRequest {
    pub category_id: i64,

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
    pub selections: Vec<BetSelection>,

    #[validate(range(min = 0, code = "INVALID_HOME_RESULT", message = "Can't be negative"))]
    pub home_result: Option<i32>,

    #[validate(range(min = 0, code = "INVALID_AWAY_RESULT", message = "Can't be negative"))]
    pub away_result: Option<i32>,
    pub result: Option<BetStatus>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum BetType {
    Moneyline,
    ThreeWay,
    Handicap,
    Over,
    Under,
    BetBuilder,
    Btts,
    Other,
    PlayerProps,
    CorrectScore,
    LadderChallenge,
}
