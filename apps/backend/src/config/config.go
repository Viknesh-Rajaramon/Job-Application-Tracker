package config

import (
	"context"
	"fmt"
	"strconv"
	"strings"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const DEVELOPMENT = "development"
const TEST = "test"
const STAGING = "staging"
const PRODUCTION = "production"

const SessionCookieName = "job-tracker-sid"

type DBConf struct {
	Host        string
	IsPSCHost   int
	Port        int
	User        string
	Name        string
	Password    string
	AppName     string
	Certificate string
}

type Configuration struct {
	Env        string
	Port       int
	DBInfo     DBConf
	ApiDomain  string
	AppDomain  string
	CookieName string
}

type Services struct {
	Db              *gorm.DB
	DBContext       *context.Context
	DBContextCancel *context.CancelFunc
}

var configuration *Configuration
var services *Services = nil

var SinglestoreDefaultDBParams = DBConf{
	Host:     "localhost",
	Port:     5000,
	User:     "",
	Name:     "",
	Password: "",
}

func IsConfigInitialized() bool {
	return configuration != nil && configuration.Env != ""
}

func IsDevelopment() bool {
	return (strings.Compare(configuration.Env, DEVELOPMENT) == 0)
}

func IsStaging() bool {
	return (strings.Compare(configuration.Env, STAGING) == 0)
}

func IsProduction() bool {
	return (strings.Compare(configuration.Env, PRODUCTION) == 0)
}

func GetConfig() *Configuration {
	return configuration
}

func GetServices() *Services {
	return services
}

func GetApiDomain() string {
	return configuration.ApiDomain
}

func UseSecureCookie() bool {
	return !IsDevelopment()
}

func GetCookieDomain() string {
	domain := GetApiDomain()
	port := ":" + strconv.Itoa(configuration.Port)
	if strings.Contains(domain, port) {
		return strings.Split(domain, port)[0]
	}

	return domain
}

func GetCookieName() string {
	return configuration.CookieName
}

func initCookieInfo(env string) {
	cookieName := fmt.Sprintf("%s%s", SessionCookieName, "d")
	switch env {
	case STAGING:
		cookieName = fmt.Sprintf("%s%s", SessionCookieName, "s")
	case PRODUCTION:
		cookieName = SessionCookieName
	}

	configuration.CookieName = cookieName
}

func InitConf(c *Configuration) {
	if IsConfigInitialized() {
		log.Info("Configuration already initialized.")
		return
	}

	log.SetFormatter(&log.JSONFormatter{})
	if c == nil {
		log.Fatal("Invalid configuration.")
	}

	if c.Env == "" {
		log.WithField("config", "c").Fatal("Environment not provided on config initialization.")
	}

	log.WithField("config", "c").Info("Configuration Initialized.")
	configuration = c
}

func GetSinglestoreDSNString(dbConf *DBConf) string {
	if dbConf.User == "" || dbConf.Password == "" || dbConf.Name == "" || dbConf.Host == "" || dbConf.Port == 0 {
		log.WithField("db_config", dbConf).Fatal("Invalid singlestore db config.")
	}

	return fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=require",
		dbConf.Host,
		dbConf.Port,
		dbConf.User,
		dbConf.Password,
		dbConf.Name,
	)
}

func InitDB(config Configuration) error {
	if !IsConfigInitialized() {
		log.Fatal("Config not initialized on InitDB.")
	}

	if services == nil {
		services = &Services{}
	}

	dbConf := config.DBInfo
	dsn := GetSinglestoreDSNString(&dbConf)
	singlestoreDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.WithError(err).Error("Failed connecting to singlestore.")
		return err
	}

	log.Info("singlestore DB Service initialized.")

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)

	services.Db = singlestoreDB
	services.DBContext = &ctx
	services.DBContextCancel = &cancel

	configuration.DBInfo = dbConf
	return nil
}

func initAppServerServices(config *Configuration) error {
	err := InitDB(*config)
	if err != nil {
		return err
	}

	initCookieInfo(config.Env)

	return nil
}

func InitAppServer(config *Configuration) error {
	if !IsConfigInitialized() {
		log.Fatal("Config not initialized on InipAppServer.")
	}

	err := initAppServerServices(config)
	if err != nil {
		return err
	}

	return nil
}
