-- Add up migration script here
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password_hash TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    role TEXT NOT NULL DEFAULT 'guest'
        CHECK (role IN ('guest', 'paid', 'boss')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX users_email_unique
    ON users (LOWER(email));

CREATE UNIQUE INDEX users_username_unique
    ON users (LOWER(username));