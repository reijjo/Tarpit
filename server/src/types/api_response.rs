use serde::Serialize;

#[derive(Serialize)]
#[serde(untagged)]
pub enum ApiResponse<T> {
    Success {
        success: bool,
        data: T,
        #[serde(skip_serializing_if = "Option::is_none")]
        message: Option<String>,
    },
    Error {
        success: bool,
        error: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        message: Option<String>,
    },
}

#[allow(dead_code)]
impl<T> ApiResponse<T> {
    pub fn success(data: T, message: Option<String>) -> Self {
        Self::Success {
            success: true,
            data,
            message,
        }
    }

    pub fn error(error: impl Into<String>, message: Option<String>) -> Self {
        Self::Error {
            success: false,
            error: error.into(),
            message,
        }
    }
}
