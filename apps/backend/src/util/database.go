package util

import (
	"encoding/json"
	"fmt"

	"github.com/jinzhu/gorm/dialects/postgres"
)

func IsEmptyPostgresJsonb(jsonb *postgres.Jsonb) bool {
	strJson := string((*jsonb).RawMessage)
	return strJson == "" || strJson == "null"
}

func DecodePostgresJsonbToStructType(sourceJsonb *postgres.Jsonb, destStruct interface{}) error {
	if IsEmptyPostgresJsonb(sourceJsonb) {
		return fmt.Errorf("Empty jsonb object")
	} else if err := json.Unmarshal((*sourceJsonb).RawMessage, destStruct); err != nil {
		return err
	}

	return nil
}

func EncodeStructTypeToPostgresJsonb(structType interface{}) (*postgres.Jsonb, error) {
	sourceJsonBytes, err := json.Marshal(structType)
	if err != nil {
		return nil, err
	}

	return &postgres.Jsonb{sourceJsonBytes}, nil
}
