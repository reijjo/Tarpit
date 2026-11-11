-- Add up migration script here
CREATE TABLE bets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    stake NUMERIC(12, 2) NOT NULL,
    final_odds NUMERIC(10, 3) NOT NULL,

    final_type TEXT NOT NULL CHECK (
        final_type IN (
            'single',
            'double',
            'treble',
            '4_fold',
            'parlay_5_plus',
            'multiple_correct_scores'
        )
    ),

    bookmaker_id BIGINT REFERENCES bookmakers(id),
    tipper_id BIGINT REFERENCES tippers(id),

    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'won',
            'lost',
            'half_won',
            'half_lost',
            'push'
        )
    ),

    notes TEXT,
    freebet BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);