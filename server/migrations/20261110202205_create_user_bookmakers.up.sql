-- Add up migration script here
CREATE TABLE user_bookmakers (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bookmaker_id BIGINT NOT NULL REFERENCES bookmakers(id),

    PRIMARY KEY (user_id, bookmaker_id)
);