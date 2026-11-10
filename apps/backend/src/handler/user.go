package handler

import (
	"net/http"
	"strings"
	"time"

	C "backend/config"
	"backend/handler/helpers"
	mid "backend/middleware"
	"backend/model/model"
	"backend/model/store"
	U "backend/util"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type signInParams struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func getSignInParams(c *gin.Context) (*signInParams, error) {
	params := signInParams{}
	err := c.BindJSON(&params)
	if err != nil {
		return nil, err
	}

	return &params, nil
}

func SignIn(c *gin.Context) {
	params, err := getSignInParams(c)
	if err != nil {
		log.WithError(err).Error("Failed to parse SignInParams.")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	email := strings.TrimSpace(params.Email)
	password := strings.TrimSpace(params.Password)

	if !U.IsEmail(email) {
		log.WithField("email", email).Error("Invalid email provided.")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user, status := store.GetStore().GetUserByEmail(email)
	if status != http.StatusOK {
		c.AbortWithStatus(status)
		return
	}

	if !model.IsPasswordAndHashEqual(password, user.Password) {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	errCode := store.GetStore().UpdateUserLastLoginInfo(user.Id, U.TimeNowZ())
	if errCode != http.StatusAccepted {
		log.WithField("user_id", user.Id).WithField("email", email).Error("Failed to update User lastLoginInfo.")
	}

	cookieData, err := helpers.GetAuthData(user.Email, user.Id, user.Salt, helpers.SecondsInOneMonth*time.Second)
	if err != nil {
		log.WithError(err).Error("Failed to generate auth cookie.")
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(C.GetCookieName(), cookieData, helpers.SecondsInOneMonth, "/", C.GetCookieDomain(), C.UseSecureCookie(), true)

	resp := map[string]interface{}{
		"status":                     "success",
		"application_statuses_color": model.DEFAULT_APPLICATION_STATUSES,
	}

	c.JSON(http.StatusOK, resp)
}

func SignOut(c *gin.Context) {
	userID := U.GetScopeByKeyAsString(c, mid.SCOPE_LOGGEDIN_USER_ID)

	c.SetCookie(C.GetCookieName(), "", helpers.ExpireCookie, "/", C.GetCookieDomain(), C.UseSecureCookie(), true)

	errCode := store.GetStore().UpdateUserLastLoggedOut(userID, U.TimeNowUnix())
	if errCode != http.StatusAccepted {
		resp := map[string]string{
			"status": "failed",
		}
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	resp := map[string]string{
		"status": "success",
	}

	c.JSON(http.StatusOK, resp)
}
