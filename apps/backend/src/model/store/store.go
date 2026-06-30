package store

import (
	"backend/model"
	storeSupabase "backend/model/store/supabase"
)

func GetStore() model.Model {
	var store model.Model
	store = &storeSupabase.Supabase{}
	return store
}
