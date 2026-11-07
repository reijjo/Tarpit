use argon2::PasswordHash;
use sqlx::PgPool;
use tower_sessions::Session;

use super::repository::{find_user_by_email, find_user_by_username};
use crate::{
    errors::{AppError, ErrorDetails},
    features::auth::login::types::LoginUser,
    types::user::User,
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

// ---------------------------------------
// Creating session
// ---------------------------------------
pub async fn authenticate_and_create_session(
    db: &PgPool,
    session: &Session,
    login: &str,
    password: &str,
) -> Result<User, AppError> {
    let login_user = get_login_user(db, login).await?;

    let valid_password = verify_password(password, &login_user.password_hash).await?;

    if !valid_password {
        return Err(AppError::Unauthorized(ErrorDetails {
            error: "INVALID_CREDENTIALS".to_string(),
            message: Some("Wrong password mate.".to_string()),
        }));
    }

    // Rotate the ID only after the credentials are valid.
    session.cycle_id().await.map_err(|error| {
        tracing::error!("Failed to rotate session ID: {error}");
        AppError::Internal(ErrorDetails {
            error: "SESSION_ERROR".to_string(),
            message: Some("Please try again.".to_string()),
        })
    })?;

    session
        .insert("user_id", login_user.id)
        .await
        .map_err(|error| {
            tracing::error!("Failed to save login session: {error}");
            AppError::Internal(ErrorDetails {
                error: "SESSION_ERROR".to_string(),
                message: Some("Please try again.".to_string()),
            })
        })?;

    Ok(User {
        id: login_user.id,
        email: login_user.email,
        username: login_user.username,
        role: login_user.role,
    })
}
