#![allow(dead_code)]
use sqlx::types::Decimal;
use validator::ValidationError;

use crate::features::bets::types::{BetLegRequest, BetType};

pub fn validate_name_length(name: &str) -> Result<(), ValidationError> {
    let length = name.trim().chars().count();

    if !(2..=30).contains(&length) {
        let mut error = ValidationError::new("INVALID_NAME_LENGTH");
        error.message = Some("Must be between 2 and 30 characters".into());
        return Err(error);
    }

    Ok(())
}

pub fn validate_decimal(decimal: &Decimal) -> Result<(), ValidationError> {
    if *decimal <= Decimal::ZERO {
        let mut error = ValidationError::new("INVALID_DECIMAL");
        error.message = Some("Must be greater than zero".into());
        return Err(error);
    }

    Ok(())
}

pub fn validate_bet_leg(leg: &BetLegRequest) -> Result<(), ValidationError> {
    let valid = if matches!(leg.bet_type, BetType::BetBuilder) {
        leg.selections.len() >= 2
    } else {
        leg.selections.len() == 1
    };

    if !valid {
        let mut error = ValidationError::new("INVALID_SELECTIONS");
        error.message = Some("Invalid number of selections".into());
        return Err(error);
    }

    Ok(())
}
