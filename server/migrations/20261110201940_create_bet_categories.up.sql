-- Add up migration script here
CREATE TABLE bet_categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
        CHECK (
            name = LOWER(TRIM(name))
            AND name <> ''
        )
);