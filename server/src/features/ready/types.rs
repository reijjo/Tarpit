use serde::Serialize;

#[derive(Serialize)]
pub struct ReadyResponse {
    pub status: &'static str,
    pub database: &'static str,
}
