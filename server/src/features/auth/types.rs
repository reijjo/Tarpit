use serde::Deserialize;
use validator::Validate;

use super::validators::{USERNAME_REGEX, validate_password_length, validate_username_length};

#[derive(Debug, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
#[allow(dead_code)]
pub struct RegisterRequest {
    #[validate(email(code = "INVALID_EMAIL", message = "Invalid email"))]
    #[validate(length(
        max = 150,
        code = "EMAIL_TOO_LONG",
        message = "Max 150 characters in email"
    ))]
    pub email: String,

    #[validate(custom(function = "validate_username_length"))]
    #[validate(regex(path = *USERNAME_REGEX, code="INVALID_USERNAME", message = "Username can only contain letters, numbers, '-', and '_'"))]
    pub username: String,

    #[validate(custom(function = "validate_password_length"))]
    pub password: String,

    #[validate(must_match(
        other = "password",
        code = "PASSWORD_MISMATCH",
        message = "Passwords do not match"
    ))]
    pub password_confirm: String,
}
