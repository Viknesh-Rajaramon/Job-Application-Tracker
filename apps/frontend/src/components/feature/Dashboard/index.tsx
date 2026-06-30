import { Box, Typography, CircularProgress } from "@mui/material";
import { useMemo, useEffect, useState } from "react";

import CustomPieChart from "../../common/PieChart";
import CustomLineChart from "../../common/LineChart";
import { getDashboardStats } from "../../../api/dashboard";

import { styles } from "./styles";
import { useAppSelector } from "../../../redux/store";

const Dashboard = () => {
    const lineChartOptions = [
        {
            label: "Month",
            value: "month"
        },
        {
            label: "Week",
            value: "week"
        },
        {
            label: "Day",
            value: "day"
        },
    ]

    const applicationStatusesColor = useAppSelector((state) => state.user.applicationStatusesColor);

    const [totalApplications, setTotalApplications] = useState(0);
    const [statusCountsMap, setStatusCountsMap] = useState<Record<string, number>>({});

    const [viewBy, setViewBy] = useState("month");
    const [trendData, setTrendData] = useState([]);

    const formatXAxisLabel = (value: string) => {
        if (viewBy === "month") {
            const date = new Date(value);

            return date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });
        }

        return value;
    };

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await getDashboardStats(viewBy);

                setTotalApplications(response.data.total_applications);
                setStatusCountsMap(response.data.status_counts || {});
                setTrendData(response.data.application_trend || {});
            } catch (err) {
                console.log(err);
            }
        };

        fetchDashboardStats();
    }, [viewBy]);

    const statusCounts = useMemo(() => {
        return Object.entries(statusCountsMap).map(([name, value]) => ({ name, value }));
    }, [statusCountsMap]);

    const applicationStatusConfig = useMemo(() => {
        return Object.entries(applicationStatusesColor || {}).map(([name, color]) => ({ name, color }));
    }, [applicationStatusesColor]);

    if (!applicationStatusesColor)
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box>
            <Box sx={styles.heading}>Dashboard</Box>

            <Box sx={styles.summary}>
                <Box sx={styles.card}>
                    <Typography variant="h6">Total Applications</Typography>
                    
                    <Typography variant="h5">{totalApplications}</Typography>
                </Box>

                {statusCounts.map((s) => (
                    <Box sx={styles.card} key={s.name}>
                        <Typography variant="h6">{s.name}</Typography>
                        
                        <Typography variant="h5">{s.value}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={styles.chartsContainer}>
                <Box sx={styles.pieChartWrapper}>
                    <CustomPieChart
                        data={statusCounts}
                        colorMapping={applicationStatusConfig}
                        hideZeroValues={true}
                        height={350}
                    />
                </Box>

                <Box sx={styles.lineChartWrapper}>
                    <CustomLineChart
                        data={trendData}
                        options={lineChartOptions}
                        xAxisFormatter={formatXAxisLabel}
                        onOptionChange={setViewBy}
                        height={350}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
