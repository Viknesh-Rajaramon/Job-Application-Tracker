package config

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	mysqldriver "github.com/go-sql-driver/mysql"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
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

func GetSinglestoreCACertificate() (string, error) {
	resp, err := http.Get("https://portal.singlestore.com/static/ca/singlestore_bundle.pem")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func GetSinglestoreDSNString(dbConf *DBConf) string {
	if dbConf.User == "" || dbConf.Password == "" || dbConf.Name == "" || dbConf.Host == "" || dbConf.Port == 0 {
		log.WithField("db_config", dbConf).Fatal("Invalid singlestore db config.")
	}

	dbConfig := mysqldriver.Config{
		User:                 dbConf.User,
		Passwd:               dbConf.Password,
		Net:                  "tcp",
		Addr:                 fmt.Sprintf("%s:%d", dbConf.Host, dbConf.Port),
		DBName:               dbConf.Name,
		Params:               map[string]string{"charset": "utf8mb4"},
		Loc:                  time.Local,
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	if dbConf.Certificate == "" {
		cert, err := GetSinglestoreCACertificate()
		if err != nil {
			log.WithError(err).Fatal("Not able to get CA Certificate")
		}

		dbConf.Certificate = cert
	}

	const tlsConfigname = "singlestore"

	// Register certificate.
	rootCertPool := x509.NewCertPool()
	if ok := rootCertPool.AppendCertsFromPEM([]byte(dbConf.Certificate)); !ok {
		log.Fatal("Failed to add certificate for memsql connection.")
	}

	mysqldriver.RegisterTLSConfig(tlsConfigname, &tls.Config{RootCAs: rootCertPool})

	// use the registered certificate.
	dbConfig.TLSConfig = tlsConfigname

	log.Info("Using SSL for Singlestore connections")

	return dbConfig.FormatDSN()
}

func InitDB(config Configuration) error {
	if !IsConfigInitialized() {
		log.Fatal("Config not initialized on InitDB.")
	}

	if services == nil {
		services = &Services{}
	}

	dbConf := config.DBInfo
	singlestoreDB, err := gorm.Open(mysql.Open(GetSinglestoreDSNString(&dbConf)), &gorm.Config{})
	if err != nil {
		log.WithError(err).Error("Failed connecting to singlestore.")
		return err
	}

	log.Info("Singlestore DB Service initialized")

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
