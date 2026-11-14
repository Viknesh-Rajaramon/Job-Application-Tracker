package model

import (
	"time"

	"backend/model/model"
)

type Model interface {
	// application
	CreateApplication(application model.Application) int
	GetApplications(userID string, page int, perPage int, search string, sortBy string, order int) ([]model.Application, int)
	GetApplicationByID(userID, applicationID string) (*model.Application, int)
	UpdateApplicationByID(userID, applicationID string, application *model.Application) int
	GetApplicationCountByUserID(userID string, search string) (int64, int)
	GetApplicationCountByStatus(userID string) (map[string]int64, int)

	// application_status
	CreateApplicationStatus(applicationID, status string) int
	GetApplicationStatuses(userID, applicationID string) ([]model.ApplicationStatus, int)

	// dashboard
	GetDashboardStats(userID string, groupBy string) (*model.DashBoard, int)

	// user
	GetUserByEmail(email string) (*model.User, int)
	GetUserByID(id string) (*model.User, int)
	UpdateUserLastLoginInfo(userID string, ts time.Time) int
	UpdateUserLastLoggedOut(userID string, timestamp int64) int
	CreateUser(user *model.User) (*model.User, int)
}
