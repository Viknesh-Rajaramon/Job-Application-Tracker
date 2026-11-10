package model

import (
	"time"
)

type User struct {
	Id              string     `gorm:"primary_key:true;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName       string     `gorm:"type:varchar(100)" json:"first_name"`
	LastName        string     `gorm:"type:varchar(100)" json:"last_name"`
	Email           string     `gorm:"type:varchar(100)" json:"email"`
	Password        string     `gorm:"type:varchar(100)" json:"-"`
	Salt            string     `gorm:"type:varchar(100)" json:"-"`
	LastLoggedInAt  *time.Time `json:"last_logged_in_at"`
	LastLoggedOut   int64      `json:"last_logged_out"`
	IsEmailVerified bool       `json:"is_email_verified"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
}

const (
	UserSaltLength = 32
)

var DEFAULT_APPLICATION_STATUSES = map[string]string{
	"Applied":             "#34a853",
	"Rejected":            "#ea4335",
	"OA Pending":          "#1f2328",
	"OA Completed":        "#fbbc04",
	"Interview Pending":   "#ff6d01",
	"Interview Completed": "#46bdc6",
}

type FieldsToUpdate = map[string]interface{}

type Option func(FieldsToUpdate)

func LastLoggedInAt(time time.Time) Option {
	return func(fields FieldsToUpdate) {
		fields["last_logged_in_at"] = time
	}
}

func LastLoggedOut(timestamp int64) Option {
	return func(fields FieldsToUpdate) {
		fields["last_logged_out"] = timestamp
	}
}
