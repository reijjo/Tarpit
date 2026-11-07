use serde::Deserialize;
use validator::Validate;

use crate::features::auth::register::validators::{
    validate_password_length, validate_username_length,
};

#[derive(Debug, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct LoginRequest {
    #[validate(custom(function = "validate_username_length"))]
    pub login: String,

    #[validate(custom(function = "validate_password_length"))]
    pub password: String,
}

#[allow(dead_code)]
#[derive(sqlx::FromRow, Debug)]
pub struct LoginUser {
    pub id: i64,
    pub email: String,
    pub username: String,
    pub password_hash: String,
    pub verified: bool,
    pub role: String,
}
