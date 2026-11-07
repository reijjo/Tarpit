use argon2::PasswordHash;
use sqlx::PgPool;

use super::repository::{find_user_by_email, find_user_by_username};
use crate::{
    errors::{AppError, ErrorDetails},
    features::auth::login::types::LoginUser,
};
use argon2::{
    Argon2,
    password_hash::{Error as PasswordHashError, PasswordVerifier},
};

// ---------------------------------------
// Finding user by login (username or email)
// ---------------------------------------

pub async fn get_login_user(db: &PgPool, login: &str) -> Result<LoginUser, AppError> {
    let result = if login.contains('@') {
        find_user_by_email(db, login).await
    } else {
        find_user_by_username(db, login).await
    };

    match result {
        Ok(Some(user)) => Ok(user),
        Ok(None) => Err(AppError::NotFound(ErrorDetails {
            error: "USER_NOT_FOUND".to_string(),
            message: Some("No such user.".to_string()),
        })),
        Err(error) => {
            tracing::error!("Failed to retrieve user: {error}");
            Err(AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to complete login.".to_string()),
            }))
        }
    }
}

// ---------------------------------------
// Verifying password
// ---------------------------------------

pub async fn verify_password(password: &str, hashed_password: &str) -> Result<bool, AppError> {
    let password = password.to_owned();
    let hashed_password = hashed_password.to_owned();

    let result = tokio::task::spawn_blocking(move || {
        let parsed_hash = PasswordHash::new(&hashed_password)?;
        Argon2::default().verify_password(password.as_bytes(), &parsed_hash)
    })
    .await
    .map_err(|error| {
        tracing::error!("Password verification task failed: {error}");
        AppError::Internal(ErrorDetails {
            error: "PASSWORD_VERIFY_FAILED".to_string(),
            message: Some("Unable to process login.".to_string()),
        })
    })?;

    match result {
        Ok(()) => Ok(true),
        Err(PasswordHashError::PasswordInvalid) => Ok(false),
        Err(error) => {
            tracing::error!("Password verification failed: {error}");
            Err(AppError::Internal(ErrorDetails {
                error: "PASSWORD_VERIFY_FAILED".to_string(),
                message: Some("Unable to process login.".to_string()),
            }))
        }
    }
}
