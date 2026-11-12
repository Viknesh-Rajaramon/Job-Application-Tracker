package singlestore

import (
	"fmt"
	"net/http"
	"time"

	C "backend/config"
	"backend/model/model"
	U "backend/util"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

func (store *Singlestore) CreateApplication(application model.Application) int {
	application.Id = U.GetUUID()

	db := C.GetServices().Db
	err := db.Create(&application).Error
	if err != nil {
		if IsDuplicateRecordError(err) {
			return http.StatusConflict
		}

		log.WithField("application", application).WithError(err).Error("Failed to create application.")
		return http.StatusInternalServerError
	}

	return http.StatusCreated
}

func getSortOrderQuery(sortBy string, order int) string {
	sortOrder := ""
	switch order {
	case 1:
		sortOrder = "ASC"
	default:
		sortOrder = "DESC"
	}

	return fmt.Sprintf("%s %s", sortBy, sortOrder)
}

func (store *Singlestore) GetApplications(userID string, page int, perPage int, search string, sortBy string, order int) ([]model.Application, int) {
	logFields := log.Fields{
		"user_id": userID,
		"page":    page,
		"perPage": perPage,
		"search":  search,
		"sortBy":  sortBy,
		"order":   order,
	}

	if userID == "" {
		return nil, http.StatusBadRequest
	}

	var applications []model.Application
	offset := (page - 1) * perPage
	sortOrder := getSortOrderQuery(sortBy, order)

	db := C.GetServices().Db
	dbx := db.Order(sortOrder).Offset(offset).Where("user_id = ?", userID)
	whereStmt, whereParams := searchQueryForApplications(search)

	if whereStmt != "" && whereParams != nil {
		dbx = dbx.Where(whereStmt, whereParams...)
	}

	err := dbx.Limit(perPage).Find(&applications).Error
	if err != nil {
		log.WithFields(logFields).WithError(err).Error("Failed to get applications.")
		return nil, http.StatusInternalServerError
	}

	if len(applications) == 0 {
		return nil, http.StatusNotFound
	}

	return applications, http.StatusFound
}

func (store *Singlestore) GetApplicationByID(userID, applicationID string) (*model.Application, int) {
	if userID == "" || applicationID == "" {
		return nil, http.StatusBadRequest
	}

	logCtx := log.WithFields(log.Fields{
		"user_id":        userID,
		"application_id": applicationID,
	})

	var application model.Application

	db := C.GetServices().Db
	err := db.Where("id = ? AND user_id = ?", applicationID, userID).First(&application).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, http.StatusNotFound
		}

		logCtx.WithError(err).Error("Failed to get application.")
		return nil, http.StatusInternalServerError
	}

	return &application, http.StatusOK
}

func (store *Singlestore) UpdateApplicationByID(userID, applicationID string, application *model.Application) int {
	if userID == "" || applicationID == "" {
		return http.StatusBadRequest
	}

	logCtx := log.WithFields(log.Fields{
		"user_id":        userID,
		"application_id": applicationID,
		"application":    *application,
	})

	db := C.GetServices().Db
	updateFields := make(map[string]interface{}, 0)
	if application.Status != "" {
		updateFields["status"] = application.Status
	}
	updateFields["updated_at"] = time.Now()

	err := db.Model(&model.Application{}).Where("id = ? AND user_id = ?", applicationID, userID).Updates(updateFields).Error
	if err != nil {
		logCtx.WithError(err).Error("Failed to update application.")
		return http.StatusInternalServerError
	}

	return http.StatusOK
}

func searchQueryForApplications(search string) (string, []interface{}) {
	if search == "" {
		return "", nil
	}

	like := fmt.Sprintf("%%%s%%", search)
	whereStmt := "company ILIKE ? OR role ILIKE ? OR status ILIKE ? OR req_id ILIKE ? OR location ILIKE ?"
	whereParams := []interface{}{like, like, like, like, like}

	return whereStmt, whereParams
}

func (store *Singlestore) GetApplicationCountByUserID(userID string, search string) (int64, int) {
	if userID == "" {
		return 0, http.StatusBadRequest
	}

	logCtx := log.WithField("user_id", userID)
	var count int64

	db := C.GetServices().Db
	dbx := db.Model(&model.Application{}).Where("user_id = ?", userID)
	whereStmt, whereParams := searchQueryForApplications(search)

	if whereStmt != "" && whereParams != nil {
		dbx = dbx.Where(whereStmt, whereParams...)
	}

	err := dbx.Count(&count).Error
	if err != nil {
		logCtx.WithError(err).Error("Failed to get applications count.")
		return 0, http.StatusInternalServerError
	}

	return count, http.StatusOK
}

func (store *Singlestore) GetApplicationCountByStatus(userID string) (map[string]int64, int) {
	db := C.GetServices().Db
	rows, err := db.Model(&model.Application{}).Where("user_id = ?", userID).Group("status").Select("status, count(*)").Rows()
	if err != nil {
		log.WithField("user_id", userID).WithError(err).Error("Failed to get application count by status.")
		return nil, http.StatusInternalServerError
	}

	countByStatus := make(map[string]int64)
	for rows.Next() {
		var applicationStatus string
		var statusCount int64
		err = rows.Scan(&applicationStatus, &statusCount)
		if err != nil {
			log.WithError(err).Error("Failed to parse records")
			continue
		} else {
			countByStatus[applicationStatus] = statusCount
		}
	}

	return countByStatus, http.StatusFound
}
