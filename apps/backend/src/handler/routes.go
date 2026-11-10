package handler

import (
	mid "backend/middleware"

	"github.com/gin-gonic/gin"
)

const ROUTE_APPLICATIONS_ROOT = "/applications"
const ROUTE_USERS_ROOT = "/users"
const ROUTE_DASHBOARD_ROOT = "/dashboard"

func InitAppRoutes(r *gin.Engine) {
	usersGroup := r.Group(ROUTE_USERS_ROOT)
	usersGroup.POST("/signin", SignIn)
	usersGroup.POST("/signout", mid.SetLoggedInUser(), SignOut)

	applicationsGroup := r.Group(ROUTE_APPLICATIONS_ROOT)
	applicationsGroup.Use(mid.SetLoggedInUser())
	applicationsGroup.POST("", CreateApplicationHandler)
	applicationsGroup.GET("", GetApplicationsHandler)
	applicationsGroup.GET("/:application_id", GetApplicationByIDHandler)
	applicationsGroup.PUT("/:application_id", EditApplicationByIDHandler)

	dashboardGroup := r.Group(ROUTE_DASHBOARD_ROOT)
	dashboardGroup.Use(mid.SetLoggedInUser())
	dashboardGroup.GET("", DashboardStatsHandler)
}
