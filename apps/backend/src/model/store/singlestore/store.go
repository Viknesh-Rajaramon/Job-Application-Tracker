package singlestore

import (
	"strings"
)

type Singlestore struct{}

const SINGLESTORE_ERROR_CODE_DUPLICATE_ENTRY = "Error 1062"

func IsDuplicateRecordError(err error) bool {
	return strings.HasPrefix(err.Error(), SINGLESTORE_ERROR_CODE_DUPLICATE_ENTRY)
}

func GetStore() *Singlestore {
	return &Singlestore{}
}
