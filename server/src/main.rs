mod app;
mod config;
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

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let listener = TcpListener::bind(config.address()).await?;
    println!("Server on http://{}", listener.local_addr()?);
    axum::serve(listener, create_app()).await
}
