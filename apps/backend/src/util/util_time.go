package util

import (
	"time"
)

func GetCurrentLocalDate() time.Time {
	currentTime := time.Now()
	return time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 0, 0, 0, 0, currentTime.Location())
}

func TimeNowZ() time.Time {
	return time.Now().UTC()
}

func TimeNowUnix() int64 {
	return TimeNowZ().Unix()
}
