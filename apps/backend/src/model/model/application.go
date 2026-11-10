package model

import (
	"time"
)

type Application struct {
	Id        string    `gorm:"primary_key:true;type:uuid;default:gen_random_uuid()" json:"id"`
	Company   string    `json:"company"`
	Role      string    `json:"role"`
	Status    string    `json:"status"`
	ReqId     string    `json:"req_id"`
	Location  string    `json:"location"`
	Link      string    `json:"link"`
	UserID    string    `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
