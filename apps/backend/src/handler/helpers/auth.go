package helpers

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"time"

	C "backend/config"

	"github.com/gorilla/securecookie"
)

const (
	SecondsInOneDay   = 86400
	SecondsInOneMonth = SecondsInOneDay * 30
	ExpireCookie      = -1
)

var (
	ErrExpired = errors.New("expired")
)

type ProtectedFields struct {
	Email string `json:"e"`
	ExpAt int64  `json:"exp"`
}

type AuthData struct {
	UserID          string `json:"ui"`
	ProtectedFields string `json:"pf"`
}

func GetAuthData(email, userId, key string, dur time.Duration) (string, error) {
	if email == "" || userId == "" || key == "" {
		return "", errors.New("missing params")
	}

	pf := ProtectedFields{
		Email: email,
		ExpAt: time.Now().UTC().Add(dur).Unix(),
	}

	encPfBytes, err := createSecureData([]byte(key), pf)
	if err != nil {
		return "", err
	}

	ad := AuthData{
		UserID:          userId,
		ProtectedFields: string(encPfBytes),
	}

	adBytes, err := json.Marshal(ad)
	if err != nil {
		return "", err
	}

	return base64.URLEncoding.EncodeToString(adBytes), nil
}

func ParseAuthData(data string) (*AuthData, error) {
	if data == "" {
		return nil, errors.New("Missing params.")
	}

	decode, err := base64.URLEncoding.DecodeString(data)
	if err != nil {
		return nil, err
	}

	ad := AuthData{}
	if err := json.Unmarshal(decode, &ad); err != nil {
		return nil, err
	}

	return &ad, nil
}

func ParseAndDecryptProtectedFields(key string, lastLoggedOut int64, protectedFields string, cookieExpiry int64) (string, string, error) {
	pf, err := decodeSecureData([]byte(key), protectedFields)
	if err != nil {
		return "", "Tampering", err
	}

	now := time.Now().UTC().Unix()

	if now > pf.ExpAt {
		return "", "ExpiredKey", ErrExpired
	}

	cookieCreatedAt := pf.ExpAt - cookieExpiry
	if cookieCreatedAt < lastLoggedOut {
		return "", "CookieInvalid", ErrExpired
	}

	return pf.Email, "", nil
}

func createSecureData(key []byte, pf ProtectedFields) (string, error) {
	s := securecookie.New(key, key)
	s = s.SetSerializer(securecookie.JSONEncoder{})
	str, err := s.Encode(C.GetCookieName(), pf)
	return str, err
}

func decodeSecureData(key []byte, value string) (ProtectedFields, error) {
	s := securecookie.New(key, key)
	s = s.SetSerializer(securecookie.JSONEncoder{})
	pf := ProtectedFields{}
	err := s.Decode(C.GetCookieName(), value, &pf)
	return pf, err
}
