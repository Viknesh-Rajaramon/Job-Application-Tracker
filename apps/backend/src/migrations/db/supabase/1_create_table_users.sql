CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_logged_out BIGINT DEFAULT 0,
    last_logged_in_at TIMESTAMP NOT NULL,
    salt VARCHAR(100),
    PRIMARY KEY (id),
    KEY (email)
);
