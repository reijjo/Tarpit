use regex::Regex;
use std::sync::LazyLock;
use validator::ValidationError;

// Regex
pub static USERNAME_REGEX: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^[a-z0-9_-]+$").unwrap());

// Validate functions
pub fn validate_username_length(username: &str) -> Result<(), ValidationError> {
    if username.chars().count() < 3 {
        let mut error = ValidationError::new("USERNAME_TOO_SHORT");
        error.message = Some("Min 3 characters in username".into());
        return Err(error);
    }

    if username.chars().count() > 30 {
        let mut error = ValidationError::new("USERNAME_TOO_LONG");
        error.message = Some("Max 30 characters in username".into());
        return Err(error);
    }

    Ok(())
}

pub fn validate_password_length(password: &str) -> Result<(), ValidationError> {
    if password.chars().count() < 8 {
        let mut error = ValidationError::new("PASSWORD_TOO_SHORT");
        error.message = Some("Min 8 characters in password".into());
        return Err(error);
    }

    if password.chars().count() > 50 {
        let mut error = ValidationError::new("PASSWORD_TOO_LONG");
        error.message = Some("Max 50 characters in password".into());
        return Err(error);
    }

    Ok(())
}

// Normalizing text
