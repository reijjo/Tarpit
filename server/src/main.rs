mod app;
mod config;

use std::io::Result;

use tokio::net::TcpListener;

use crate::{app::create_app, config::Config};

#[tokio::main]
async fn main() -> Result<()> {
    let config = Config::from_env();

    let listener = TcpListener::bind(config.address()).await?;
    println!("Server on http://{}", listener.local_addr()?);
    axum::serve(listener, create_app()).await
}
