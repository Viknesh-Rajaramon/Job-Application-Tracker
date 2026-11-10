package main

import (
	"flag"
	"strconv"

	C "backend/config"
	H "backend/handler"
	mid "backend/middleware"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func main() {
	env := flag.String("env", "development", "")
	port := flag.Int("api_http_port", 8080, "")

	dbHost := flag.String("db_host", C.SupabaseDefaultDBParams.Host, "")
	dbPort := flag.Int("db_port", C.SupabaseDefaultDBParams.Port, "")
	dbUser := flag.String("db_user", C.SupabaseDefaultDBParams.User, "")
	dbName := flag.String("db_name", C.SupabaseDefaultDBParams.Name, "")
	dbPass := flag.String("db_pass", C.SupabaseDefaultDBParams.Password, "")

	apiDomain := flag.String("api_domain", "localhost:8080", "")
	appDomain := flag.String("app_domain", "localhost:3000", "")

	flag.Parse()

	config := &C.Configuration{
		Env:  *env,
		Port: *port,
		DBInfo: C.DBConf{
			Host:     *dbHost,
			Port:     *dbPort,
			User:     *dbUser,
			Name:     *dbName,
			Password: *dbPass,
		},
		ApiDomain: *apiDomain,
		AppDomain: *appDomain,
	}
	C.InitConf(config)

	err := C.InitAppServer(config)
	if err != nil {
		log.WithError(err).Fatal("Failed to initialize.")
		return
	}

	if !C.IsDevelopment() {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(mid.CustomCors())

	H.InitAppRoutes(r)

	r.Run(":" + strconv.Itoa(C.GetConfig().Port))
}
