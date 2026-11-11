-- Add up migration script here
CREATE TABLE bet_legs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bet_id BIGINT NOT NULL REFERENCES bets(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES bet_categories(id),

    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    event_date DATE NOT NULL,

    livebet BOOLEAN NOT NULL DEFAULT FALSE,
    odds NUMERIC(10, 3) NOT NULL,

    bet_type TEXT NOT NULL CHECK (
        bet_type IN (
            'moneyline',
            'three_way',
            'handicap',
            'over',
            'under',
            'bet_builder',
            'btts',
            'other',
            'player_props',
            'correct_score',
            'ladder_challenge'
        )
    ),

    selections JSONB NOT NULL,

    home_result INTEGER,
    away_result INTEGER,

    result TEXT NOT NULL DEFAULT 'pending' CHECK (
        result IN (
            'pending',
            'won',
            'lost',
            'half_won',
            'half_lost',
            'push'
        )
    ),

    CONSTRAINT valid_selections CHECK (
        CASE
            WHEN jsonb_typeof(selections) <> 'array' THEN FALSE
            WHEN bet_type = 'bet_builder'
                THEN jsonb_array_length(selections) >= 2
            ELSE jsonb_array_length(selections) = 1
        END
    )
);