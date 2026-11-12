package singlestore

import (
	C "backend/config"
	"backend/model/model"

	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"
)

func (store *Singlestore) GetDashboardStats(userID string, timestampType string) (*model.DashBoard, int) {
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
	switch timestampType {
	case model.GroupByTimestampWeek:
		return "DATE_FORMAT(DATE_TRUNC('week', created_at), '%Y-%m-%d')"
	case model.GroupByTimestampMonth:
		return "DATE_FORMAT(DATE_TRUNC('month', created_at), '%Y-%m-%d')"
	default:
		return "DATE_FORMAT(created_at, '%Y-%m-%d')"
	}

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

func getQuery(addSelecStmnt string) string {
	if addSelecStmnt == "" {
		return ""
	}

	qStmnt := "SELECT " + addSelecStmnt + " FROM applications"
	qStmnt = appendStatement(qStmnt, fmt.Sprintf("WHERE user_id = ?"))
	qStmnt = appendStatement(qStmnt, fmt.Sprintf("GROUP BY 1"))
	qStmnt = appendStatement(qStmnt, fmt.Sprintf("ORDER BY 1"))

	return qStmnt
}

func (store *Singlestore) GetApplicationTrend(userID string, groupByTimestamp string) ([]model.TrendPoint, int) {
	logCtx := log.WithFields(log.Fields{
		"user_id":            userID,
		"group_by_timestamp": groupByTimestamp,
	})

	if userID == "" {
		logCtx.Error("User id empty in GetApplicationTrend.")
		return nil, http.StatusBadRequest
	}

	qSelect := fmt.Sprintf("%s as %s", getSelectTimestampByType(groupByTimestamp), model.AliasDate)
	qSelect = joinWithComma(qSelect, fmt.Sprintf("COUNT(*) AS %s", model.AliasCount))

	qStmnt := getQuery(qSelect)
	if qStmnt == "" {
		logCtx.Error("Failed to get query in GetApplicationTrend.")
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
