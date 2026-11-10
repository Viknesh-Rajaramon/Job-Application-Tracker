package util

import (
	"github.com/gin-gonic/gin"
)

func SetScope(c *gin.Context, key string, value interface{}) {
	scopeValue, exists := c.Get("scopes")
	if !exists {
		c.Set("scopes", map[string]interface{}{key: value})
		return
	}

	scopeValue.(map[string]interface{})[key] = value
}

func GetScopeByKey(c *gin.Context, key string) interface{} {
	scopeValue, exists := c.Get("scopes")
	if exists {
		return scopeValue.(map[string]interface{})[key]
	}

	return nil
}

func GetScopeByKeyAsString(c *gin.Context, key string) string {
	iface := GetScopeByKey(c, key)
	if iface == nil {
		return ""
	}

	return iface.(string)
}
