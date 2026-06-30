package middleware

import (
	"net/http"

	C "backend/config"
	"backend/handler/helpers"
	"backend/model/model"
	"backend/model/store"
	U "backend/util"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

const SCOPE_LOGGEDIN_USER_ID = "loggedInUserId"

func validateAuthData(authDataStr string, cookieExpiry int64) (*model.User, string, int) {
	if authDataStr == "" {
		return nil, "Error parsing auth data empty", http.StatusBadRequest
	}

	authData, err := helpers.ParseAuthData(authDataStr)
	if err != nil {
		return nil, "Error parsing auth data.", http.StatusUnauthorized
	}

	user, errCode := store.GetStore().GetUserByID(authData.UserID)
	switch errCode {
	case http.StatusNotFound:
		return nil, "User not found.", http.StatusUnauthorized
	case http.StatusInternalServerError:
		return nil, "Error fetching user.", http.StatusInternalServerError
	}

	email, _, err := helpers.ParseAndDecryptProtectedFields(user.Salt, user.LastLoggedOut, authData.ProtectedFields, cookieExpiry)
	if err != nil {
		return nil, "Error parsing protected fields.", http.StatusUnauthorized
	}

	if email != user.Email {
		return nil, "Token email and user email do not match.", http.StatusUnauthorized
	}

	return user, "", http.StatusOK
}

func SetLoggedInUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookieStr, err := c.Cookie(C.GetCookieName())
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Session cookie not found."})
			return
		}

		if cookieStr == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing session cookie data."})
			return
		}

		user, errMsg, errCode := validateAuthData(cookieStr, helpers.SecondsInOneMonth)
		if errCode != http.StatusOK {
			c.AbortWithStatusJSON(errCode, gin.H{"error": errMsg})
			return
		}

		if user == nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Unable to authenticate."})
			return
		}

		U.SetScope(c, SCOPE_LOGGEDIN_USER_ID, user.Id)
		c.Next()
	}
}

func CustomCors() gin.HandlerFunc {
	return func(c *gin.Context) {
		corsConfig := cors.DefaultConfig()
		corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "HEAD", "DELETE"}

		if C.IsDevelopment() || C.IsStaging() {
			log.Infof("Running custom cors in %s environment.", C.GetConfig().Env)
			corsConfig.AllowOrigins = []string{
				"http://localhost:8080",
				"http://localhost:3000",
				"http://127.0.0.1:8080",
				"http://127.0.0.1:3000",
			}
		} else {
			corsConfig.AllowOrigins = []string{}
		}

		corsConfig.AllowCredentials = true
		corsConfig.AddAllowHeaders("Access-Control-Allow-Headers")
		corsConfig.AddAllowHeaders("Access-Control-Allow-Origin")
		corsConfig.AddAllowHeaders("content-type")
		corsConfig.AddAllowHeaders("Authorization")

		cors.New(corsConfig)(c)
		c.Next()
	}
}
