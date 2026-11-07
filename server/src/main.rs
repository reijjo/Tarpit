mod app;
mod config;
mod db;
mod errors;
mod features;
mod middleware;
mod state;
mod types;
pub mod utils;

use tokio::{net::TcpListener, signal};

use crate::{app::create_app, config::Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
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

    // Server itself
    let listener = TcpListener::bind(config.address()).await?;
    tracing::info!("Server running on http://{}", listener.local_addr()?);

    axum::serve(listener, create_app(pool))
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

async fn shutdown_signal() {
    signal::ctrl_c()
        .await
        .expect("failed to install Ctrl+C handler");
}

// async fn shutdown_signal(deletion_task_abort_handle: AbortHandle) {
//     let ctrl_c = async {
//         signal::ctrl_c()
//             .await
//             .expect("failed to install Ctrl+C handler");
//     };

//     #[cfg(unix)]
//     let terminate = async {
//         signal::unix::signal(signal::unix::SignalKind::terminate())
//             .expect("failed to install signal handler")
//             .recv()
//             .await;
//     };

//     #[cfg(not(unix))]
//     let terminate = std::future::pending::<()>();

//     tokio::select! {
//         _ = ctrl_c => { deletion_task_abort_handle.abort() },
//         _ = terminate => { deletion_task_abort_handle.abort() },
//     }
// }
