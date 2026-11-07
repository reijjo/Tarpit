mod app;
mod config;
mod db;
mod errors;
mod features;
mod middleware;
mod state;
mod types;
pub mod utils;

use std::time::Duration;

use time::Duration as SessionDuration;
use tokio::{net::TcpListener, signal, task::AbortHandle};
use tower_sessions::{ExpiredDeletion, SessionManagerLayer};
use tower_sessions_sqlx_store::{PostgresStore, sqlx::PgPool};

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

    // Login session
    let session_pool = PgPool::connect(&config.database_url).await?;
    let session_store = PostgresStore::new(session_pool);
    session_store.migrate().await?;

    // Cleans up the session table and removes expired sessions
    let deletion_task = tokio::spawn(
        session_store
            .clone()
            .continuously_delete_expired(Duration::from_secs(60 * 60)),
    );

    let session_layer = SessionManagerLayer::new(session_store)
        .with_secure(config.session_cookie_secure)
        .with_expiry(tower_sessions::Expiry::OnInactivity(SessionDuration::days(
            7,
        )));

    // Server itself
    let listener = TcpListener::bind(config.address()).await?;
    tracing::info!("Server running on http://{}", listener.local_addr()?);

    axum::serve(listener, create_app(pool, session_layer))
        .with_graceful_shutdown(shutdown_signal(deletion_task.abort_handle()))
        .await?;

    Ok(())
}

async fn shutdown_signal(deletion_task_abort_handle: AbortHandle) {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => { deletion_task_abort_handle.abort() },
        _ = terminate => { deletion_task_abort_handle.abort() },
    }
}
