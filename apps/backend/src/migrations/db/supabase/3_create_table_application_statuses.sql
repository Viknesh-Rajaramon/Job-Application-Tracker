CREATE TABLE IF NOT EXISTS application_status (
    application_id TEXT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (application_id, status),
    SHARD KEY (application_id)
);
