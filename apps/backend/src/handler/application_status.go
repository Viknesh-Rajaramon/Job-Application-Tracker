package handler

import (
	mid "backend/middleware"
	"backend/model/store"
	U "backend/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetApplicationStatusesHandler(c *gin.Context) {
	applicationID := c.Param("application_id")
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	statuses, status := store.GetStore().GetApplicationStatuses(userID, applicationID)
	if status != http.StatusOK {
		c.AbortWithStatusJSON(status, gin.H{"error": "Failed to get application statuses."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statuses})
}
