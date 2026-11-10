package handler

import (
	mid "backend/middleware"
	"backend/model/store"
	U "backend/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

func DashboardStatsHandler(c *gin.Context) {
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	groupBy := c.DefaultQuery("group_by", "month")

	dashboardStats, errCode := store.GetStore().GetDashboardStats(userID, groupBy)
	if errCode != http.StatusOK {
		c.JSON(errCode, gin.H{"error": "Failed to get dashboard stats."})
		return
	}

	c.JSON(http.StatusOK, dashboardStats)
}
