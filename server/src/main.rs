mod app;
mod config;
mod db;
mod errors;
mod features;
mod middleware;
mod state;
mod types;

use std::io::Result;

use tokio::net::TcpListener;

use crate::{app::create_app, config::Config};

#[tokio::main]
async fn main() -> Result<()> {
    let config = Config::from_env();

    // Logger
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    // Database connection
    let pool = db::connect_db(&config.database_url)
        .await
        .expect("Failed to connect to database.");
    tracing::info!("Connected to PostgreSQL");

    let listener = TcpListener::bind(config.address()).await?;
    tracing::info!("Server running on http://{}", listener.local_addr()?);

    axum::serve(listener, create_app(pool)).await
}
