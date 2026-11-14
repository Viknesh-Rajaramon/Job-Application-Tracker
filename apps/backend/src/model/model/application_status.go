package model

import (
	"time"
)

type ApplicationStatus struct {
	ApplicationID string    `json:"application_id"`
	Status        string    `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
}
