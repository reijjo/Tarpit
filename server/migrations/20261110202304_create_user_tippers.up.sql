-- Add up migration script here
CREATE TABLE user_tippers (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tipper_id BIGINT NOT NULL REFERENCES tippers(id),

    PRIMARY KEY (user_id, tipper_id)
);