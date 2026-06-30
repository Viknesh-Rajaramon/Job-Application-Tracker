package handler

import (
	"net/http"

	mid "backend/middleware"
	"backend/model/model"
	"backend/model/store"
	U "backend/util"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func CreateApplicationHandler(c *gin.Context) {
	userId := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	var application model.Application
	application.UserID = userId

	if err := c.ShouldBindJSON(&application); err != nil {
		log.WithError(err).Error("Creating Application failed. JSON Decoding failed.")
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Creating application failed. Invalid request payload.",
		})
		return
	}

	status := store.GetStore().CreateApplication(application)
	if status != http.StatusCreated {
		if status == http.StatusConflict {
			c.AbortWithStatusJSON(status, gin.H{"error": "Duplicate application."})
			return
		}

		c.AbortWithStatusJSON(status, gin.H{"error": "Failed to create application."})
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Application created successfully."})
}

type applicationsQueryParams struct {
	Page    int    `form:"page"`
	PerPage int    `form:"per_page"`
	SortBy  string `form:"sort_by"`
	Order   int    `form:"order"`
	Search  string `form:"search"`
}

func getApplicationQueryParams(c *gin.Context) (*applicationsQueryParams, error) {
	params := applicationsQueryParams{}
	err := c.ShouldBindQuery(&params)
	if err != nil {
		return nil, err
	}

	return &params, nil
}

func GetApplicationsHandler(c *gin.Context) {
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)
	if userID == "" {
		log.Error("No user_id.")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	params, err := getApplicationQueryParams(c)
	if err != nil {
		log.WithError(err).Error("Failed to parse GetApplicationQueryParams.")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if params.Page < 1 || params.PerPage < 1 {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	applications, status := store.GetStore().GetApplications(userID, params.Page, params.PerPage, params.Search, params.SortBy, params.Order)
	if status != http.StatusFound {
		c.AbortWithStatus(status)
		return
	}

	applicationCount, status := store.GetStore().GetApplicationCountByUserID(userID, params.Search)
	if status != http.StatusOK {
		c.AbortWithStatus(status)
		return
	}

	resp := map[string]interface{}{
		"total": applicationCount,
		"data":  applications,
	}

	c.JSON(http.StatusOK, resp)
}

func GetApplicationByIDHandler(c *gin.Context) {
	applicationId := c.Param("application_id")
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	application, status := store.GetStore().GetApplicationByID(userID, applicationId)
	if status != http.StatusOK {
		c.AbortWithStatusJSON(status, gin.H{"error": "Application not found."})
		return
	}

	c.JSON(http.StatusOK, application)
}

func EditApplicationByIDHandler(c *gin.Context) {
	applicationID := c.Param("application_id")
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	var application model.Application

	if err := c.ShouldBindJSON(&application); err != nil {
		log.WithError(err).Error("Update Application failed. JSON Decoding failed.")
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Application update failed. Invalid request payload.",
		})
		return
	}

	status := store.GetStore().UpdateApplicationByID(userID, applicationID, &application)
	if status != http.StatusOK {
		c.AbortWithStatusJSON(status, gin.H{"error": "Failed to update application."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application updated successfully."})
}
