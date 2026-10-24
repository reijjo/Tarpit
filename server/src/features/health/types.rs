use serde::Serialize;

#[derive(Serialize)]
pub struct HealthResponse {
    pub status: &'static str,
    pub timestamp: String,
    pub uptime_seconds: u64,
    pub version: &'static str,
}
