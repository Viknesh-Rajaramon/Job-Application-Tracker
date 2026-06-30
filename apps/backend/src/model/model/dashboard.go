package model

const (
	GroupByTimestampDate  = "date"
	GroupByTimestampWeek  = "week"
	GroupByTimestampMonth = "month"
)

const (
	AliasDate  = "date"
	AliasCount = "count"
)

type DashBoard struct {
	TotalApplications int64            `json:"total_applications"`
	StatusCounts      map[string]int64 `json:"status_counts"`
	ApplicationTrend  []TrendPoint     `json:"application_trend"`
}

type TrendPoint struct {
	Date  string `json:"date"`
	Count int64  `json:"count"`
}
