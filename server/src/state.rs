use std::time::Instant;

#[derive(Clone)]
pub struct AppState {
    pub start_time: Instant,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            start_time: Instant::now(),
        }
    }
}
