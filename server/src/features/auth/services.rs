use argon2::{Argon2, PasswordHasher};
use sqlx::PgPool;

use crate::{
    errors::{AppError, ErrorDetails},
    features::auth::{repository, types::RegisterRequest},
};

// Creating new user
pub async fn hash_password(password: &str) -> Result<String, AppError> {
    let password = password.to_owned();

    tokio::task::spawn_blocking(move || {
        Argon2::default()
            .hash_password(password.as_bytes())
            .map(|hash| hash.to_string())
    })
    .await
    .map_err(|error| {
        tracing::error!("Password hashing task failed: {error}");
        AppError::Internal(ErrorDetails {
            error: "PASSWORD_HASH_FAILED".to_string(),
            message: Some("Unable to process registration.".to_string()),
        })
    })?
    .map_err(|error| {
        tracing::error!("Password hashing failed: {error}");
        AppError::Internal(ErrorDetails {
            error: "PASSWORD_HASH_FAILED".to_string(),
            message: Some("Unable to process registration.".to_string()),
        })
    })
}

pub async fn create_user(db: &PgPool, payload: &RegisterRequest) -> Result<(), AppError> {
    let password_hash = hash_password(&payload.password).await?;

    repository::create_user(db, &payload.email, &payload.username, &password_hash)
        .await
        .map_err(|error| {
            if let sqlx::Error::Database(db_error) = &error
                && db_error.is_unique_violation()
            {
                return AppError::Conflict(ErrorDetails {
                    error: "USER_ALREADY_EXISTS".to_string(),
                    message: Some("Email or username is already registered.".to_string()),
                });
            }

            tracing::error!("Failed to create user: {error}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to complete registration.".to_string()),
            })
        })?;

    Ok(())
}

// Duplicate checks
pub async fn is_email_registered(db: &PgPool, email: &str) -> Result<(), AppError> {
    let email_exists = repository::email_exists(db, email).await.map_err(|error| {
        tracing::error!("Email lookup failed: {error}");

        AppError::Internal(ErrorDetails {
            error: "DATABASE_ERROR".to_string(),
            message: Some("Unable to process registration.".to_string()),
        })
    })?;

    if email_exists {
        return Err(AppError::Conflict(ErrorDetails {
            error: "EMAIL_ALREADY_EXISTS".to_string(),
            message: Some("Email is already registered.".to_string()),
        }));
    }

    Ok(())
}

pub async fn is_username_registered(db: &PgPool, username: &str) -> Result<(), AppError> {
    let username_exists = repository::username_exists(db, username)
        .await
        .map_err(|error| {
            tracing::error!("Username lookup failed: {error}");

            AppError::Internal(ErrorDetails {
                error: "DATABASE_ERROR".to_string(),
                message: Some("Unable to process registration.".to_string()),
            })
        })?;

    if username_exists {
        return Err(AppError::Conflict(ErrorDetails {
            error: "USERNAME_ALREADY_EXISTS".to_string(),
            message: Some("Username is already registered.".to_string()),
        }));
    }

    Ok(())
}
