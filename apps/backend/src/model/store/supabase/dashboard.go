package supabase

import (
	C "backend/config"
	"backend/model/model"
	"errors"
	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"
)

func (store *Supabase) GetDashboardStats(userID string, timestampType string) (*model.DashBoard, int) {
	if userID == "" {
		log.WithField("user_id", userID).Error("User id empty in GetDashboardStats.")
		return nil, http.StatusBadRequest
	}

	logCtx := log.WithField("user_id", userID)

	statusCounts, errCode := store.GetApplicationCountByStatus(userID)
	if errCode != http.StatusFound {
		logCtx.Error("Failed to get status count.")
		return nil, errCode
	}

	var total int64
	for status := range model.DEFAULT_APPLICATION_STATUSES {
		if _, exists := statusCounts[status]; !exists {
			statusCounts[status] = 0
		} else {
			total += statusCounts[status]
		}
	}

	trend, errCode := store.GetApplicationTrend(userID, timestampType)
	if errCode != http.StatusOK {
		return nil, errCode
	}

	return &model.DashBoard{
		TotalApplications: total,
		StatusCounts:      statusCounts,
		ApplicationTrend:  trend,
	}, http.StatusOK
}

func getSelectTimestampByType(timestampType string) string {
	var selectStr string
	if timestampType == model.GroupByTimestampWeek {
		selectStr = fmt.Sprintf("DATE_TRUNC('week', created_at)::date::text")
	} else if timestampType == model.GroupByTimestampMonth {
		selectStr = fmt.Sprintf("DATE_TRUNC('month', created_at)::date::text")
	} else {
		selectStr = fmt.Sprintf("created_at::date::text")
	}

	return selectStr
}

func joinWithComma(x ...string) string {
	return joinWithWordInBetween(",", x...)
}

func joinWithWordInBetween(word string, x ...string) string {
	var y string
	for i, v := range x {
		if v != "" {
			if i == 0 || y == "" {
				y = v
			} else {
				y = fmt.Sprintf("%s %s %s", y, word, v)
			}
		}
	}

	return y
}

func appendStatement(x, y string) string {
	return fmt.Sprintf("%s %s", x, y)
}

func getQuery(qStmnt *string, addSelecStmnt string) error {
	if addSelecStmnt == "" {
		return errors.New("invalid select on applications filter")
	}

	rStmnt := "SELECT " + addSelecStmnt + " FROM applications"
	rStmnt = appendStatement(rStmnt, fmt.Sprintf("WHERE user_id = ?"))
	rStmnt = appendStatement(rStmnt, fmt.Sprintf("GROUP BY 1"))
	rStmnt = appendStatement(rStmnt, fmt.Sprintf("ORDER BY 1"))

	*qStmnt = appendStatement(*qStmnt, rStmnt)

	return nil
}

func (store *Supabase) GetApplicationTrend(userID string, groupByTimestamp string) ([]model.TrendPoint, int) {
	if userID == "" {
		log.WithField("user_id", userID).Error("User id empty in GetApplicationTrend.")
		return nil, http.StatusBadRequest
	}

	var qSelect string
	qSelect = joinWithComma(qSelect, fmt.Sprintf("%s as %s", getSelectTimestampByType(groupByTimestamp), model.AliasDate))
	qSelect = joinWithComma(qSelect, fmt.Sprintf("COUNT(*) AS %s", model.AliasCount))

	var qStmnt string
	getQuery(&qStmnt, qSelect)
	if qStmnt == "" {
		log.WithField("user_id", userID).Error("Failed to get query in GetApplicationTrend.")
		return nil, http.StatusInternalServerError
	}

	var results []model.TrendPoint

	db := C.GetServices().Db
	err := db.Raw(qStmnt, userID).Scan(&results).Error
	if err != nil {
		log.WithFields(log.Fields{"user_id": userID, "qStmnt": qStmnt}).Error("Failed to run query in GetApplicationTrend.")
		return nil, http.StatusInternalServerError
	}

	return results, http.StatusOK
}
