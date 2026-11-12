package store

import (
	"backend/model"
	storeSinglestore "backend/model/store/singlestore"
)

func GetStore() model.Model {
	var store model.Model
	store = &storeSinglestore.Singlestore{}
	return store
}
