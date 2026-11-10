package singlestore

import (
	"net/http"
	"strings"
	"time"

	C "backend/config"
	"backend/model/model"
	U "backend/util"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

func (store *Singlestore) GetUserByEmail(email string) (*model.User, int) {
	if email == "" {
		log.Error("GetUserByEmail failed. Email not provided.")
		return nil, http.StatusBadRequest
	}

	email = strings.ToLower(email)

	var user model.User

	db := C.GetServices().Db
	err := db.Limit(1).Where("email = ?", email).Find(&user).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, http.StatusNotFound
		}

		log.WithField("email", email).WithError(err).Error("Failed to get user by email.")
		return nil, http.StatusInternalServerError
	}

	return &user, http.StatusOK
}

func (store *Singlestore) GetUserByID(id string) (*model.User, int) {
	if id == "" {
		return nil, http.StatusBadRequest
	}

	var user model.User

	db := C.GetServices().Db
	err := db.Limit(1).Where("id = ?", id).Find(&user).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, http.StatusNotFound
		}

		log.WithField("id", id).WithError(err).Error("Failed to get user by id.")
		return nil, http.StatusInternalServerError
	}

	return &user, http.StatusOK
}

func updateUser(userID string, options ...model.Option) int {
	if userID == "" {
		return http.StatusBadRequest
	}

	fields := model.FieldsToUpdate{}
	for _, option := range options {
		option(fields)
	}

	if len(fields) == 0 {
		return http.StatusBadRequest
	}

	db := C.GetServices().Db
	dbx := db.Model(&model.User{}).Where("id = ?", userID).Updates(fields)
	if dbx.Error != nil {
		log.WithField("user_id", userID).WithError(dbx.Error).Error("updateUser failed.")
		return http.StatusInternalServerError
	}

	if dbx.RowsAffected == 0 {
		return http.StatusNoContent
	}

	return http.StatusAccepted
}

func (store *Singlestore) UpdateUserLastLoginInfo(userID string, ts time.Time) int {
	logFields := log.Fields{
		"user_id": userID,
		"ts":      ts,
	}

	if userID == "" {
		log.WithFields(logFields).Error("UpdateUserLastLoginInfo failed. Missing params.")
		return http.StatusBadRequest
	}

	return updateUser(userID, model.LastLoggedInAt(ts))
}

func (store *Singlestore) UpdateUserLastLoggedOut(userID string, timestamp int64) int {
	logFields := log.Fields{
		"user_id":   userID,
		"timestamp": timestamp,
	}

	if userID == "" {
		log.WithFields(logFields).Error("UpdateUserLastLoggedOut failed. Missing params.")
		return http.StatusBadRequest
	}

	return updateUser(userID, model.LastLoggedOut(timestamp))
}

func (store *Singlestore) CreateUser(user *model.User) (*model.User, int) {
	if user.Email == "" {
		log.Error("CreateUser failed. Email not provided.")
		return nil, http.StatusBadRequest
	}

	user.Email = strings.ToLower(user.Email)
	if _, errCode := store.GetUserByEmail(user.Email); errCode == http.StatusFound {
		return nil, http.StatusBadRequest
	}

	var err error
	user.Password, err = model.HashPassword(user.Password)
	if err != nil {
		log.WithError(err).Error("Hash password failed in CreateUser.")
		return nil, http.StatusInternalServerError
	}

	if user.Salt == "" {
		user.Salt = U.RandomString(model.UserSaltLength)
	}

	if user.Id == "" {
		user.Id = U.GetUUID()
	}

	db := C.GetServices().Db
	if err := db.Create(user).Error; err != nil {
		log.WithError(err).Error("CreateUser failed.")
		return nil, http.StatusInternalServerError
	}

	return user, http.StatusCreated
}
