package util

import (
	"math/rand"
	"regexp"
	"time"

	"github.com/google/uuid"
)

func GetUUID() string {
	return uuid.New().String()
}

func IsEmail(str string) bool {
	regexpEmail := regexp.MustCompile(`^[A-Za-z0-9._%+\-'’^!]+@[A-Za-z0-9.\-]+\.[A-Za-z-]{2,20}$`)
	return regexpEmail.MatchString(str)
}

func RandomString(n int) string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	var letter = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	b := make([]rune, n)
	for i := range b {
		b[i] = letter[r.Intn(len(letter))]
	}

	return string(b)
}
