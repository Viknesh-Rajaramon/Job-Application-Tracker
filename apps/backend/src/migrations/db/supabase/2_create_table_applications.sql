CREATE TABLE IF NOT EXISTS applications (
    id TEXT NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    req_id VARCHAR(30),
    location VARCHAR(255),
    status VARCHAR(30) NOT NULL,
    link VARCHAR(2048),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT NOT NULL,
    PRIMARY KEY (id),
    KEY application_user_idx (user_id),
    KEY application_user_status_idx (user_id, status)
);
