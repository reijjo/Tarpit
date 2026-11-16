use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[serde(rename_all = "snake_case")]
#[sqlx(type_name = "text", rename_all = "snake_case")]
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

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[serde(rename_all = "snake_case")]
#[sqlx(type_name = "text", rename_all = "snake_case")]
pub enum BetStatus {
    Pending,
    Won,
    Lost,
    HalfWon,
    HalfLost,
    Push,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[serde(rename_all = "snake_case")]
#[sqlx(type_name = "text", rename_all = "snake_case")]
pub enum FinalType {
    Single,
    Double,
    Treble,

    #[serde(rename = "4_fold")]
    #[sqlx(rename = "4_fold")]
    FourFold,

    #[serde(rename = "parlay_5_plus")]
    #[sqlx(rename = "parlay_5_plus")]
    Parlay5Plus,
    MultipleCorrectScores,
}
