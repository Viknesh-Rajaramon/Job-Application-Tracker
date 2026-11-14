package singlestore

import (
	C "backend/config"
	"backend/model/model"
	"net/http"
	"time"

	log "github.com/sirupsen/logrus"
)

func updateCreatedAtForApplicationStatus(applicationID, status string) int {
	updateFields := map[string]interface{}{
		"created_at": time.Now(),
	}

	db := C.GetServices().Db
	err := db.Model(&model.ApplicationStatus{}).Where("application_id = ? AND status = ?", applicationID, status).Updates(updateFields).Error
	if err != nil {
		return http.StatusInternalServerError
	}

	return http.StatusOK
}

func (store *Singlestore) CreateApplicationStatus(applicationID, status string) int {
	if applicationID == "" || status == "" {
		return http.StatusBadRequest
	}

	logCtx := log.WithFields(log.Fields{
		"application_id": applicationID,
		"status":         status,
	})

	applicationStatus := model.ApplicationStatus{
		ApplicationID: applicationID,
		Status:        status,
		CreatedAt:     time.Now(),
	}

	db := C.GetServices().Db
	err := db.Create(&applicationStatus).Error
	if err == nil {
		return http.StatusOK
	}

	if !IsDuplicateRecordError(err) {
		logCtx.WithError(err).Error("Failed to create application status.")
		return http.StatusInternalServerError
	}

	errCode := updateCreatedAtForApplicationStatus(applicationID, status)
	if errCode != http.StatusOK {
		logCtx.WithError(err).Error("Failed to create application status.")
		return errCode
	}

	return errCode
}

func (store *Singlestore) GetApplicationStatuses(userID, applicationID string) ([]model.ApplicationStatus, int) {
	logCtx := log.WithFields(log.Fields{
		"user_id":        userID,
		"application_id": applicationID,
	})

	_, status := store.GetApplicationByID(userID, applicationID)
	if status == http.StatusBadRequest || status == http.StatusInternalServerError {
		logCtx.Error("Failed to check if application exists")
		return nil, status
	}

	if status == http.StatusNotFound {
		logCtx.Error("Application does not exist")
		return nil, status
	}

	var statuses []model.ApplicationStatus
	db := C.GetServices().Db
	err := db.Where("application_id = ?", applicationID).Order("created_at DESC").Find(&statuses).Error
	if err != nil {
		logCtx.WithError(err).Error("Failed to get application statuses.")
		return nil, http.StatusInternalServerError
	}

	return statuses, http.StatusOK
}
