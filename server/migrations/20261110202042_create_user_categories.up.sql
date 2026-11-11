-- Add up migration script here
CREATE TABLE user_categories (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES bet_categories(id),

    PRIMARY KEY (user_id, category_id)
);