package supabase

import (
	"strings"
)

type Supabase struct{}

const MEMSQL_ERROR_CODE_DUPLICATE_ENTRY = "Error 1062"

func IsDuplicateRecordError(err error) bool {
	return strings.HasPrefix(err.Error(), MEMSQL_ERROR_CODE_DUPLICATE_ENTRY)
}

func GetStore() *Supabase {
	return &Supabase{}
}
