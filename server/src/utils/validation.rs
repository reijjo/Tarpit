use validator::Validate;

use crate::errors::{AppError, ErrorDetails};

pub fn validate_payload<T: Validate>(payload: &T, fallback_message: &str) -> Result<(), AppError> {
    if let Err(errors) = payload.validate() {
        if let Some(validation_error) = errors
            .field_errors()
            .values()
            .next()
            .and_then(|field_errors| field_errors.first())
        {
            let message = validation_error
                .message
                .as_ref()
                .map(|text| text.to_string());

            return Err(AppError::BadRequest(ErrorDetails {
                error: validation_error.code.to_string(),
                message,
            }));
        }

        return Err(AppError::BadRequest(ErrorDetails {
            error: "VALIDATION_ERROR".to_string(),
            message: Some(fallback_message.to_string()),
        }));
    }

    Ok(())
}
