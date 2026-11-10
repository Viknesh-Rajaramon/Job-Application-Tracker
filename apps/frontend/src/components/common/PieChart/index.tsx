import { Box, Typography } from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { PieChartData, PieChartColorMapping } from "../../../types/charts";

import { styles } from "./styles";

interface PieChartProps {
    title?: string;
    data: PieChartData[];
    colorMapping: PieChartColorMapping[];
    width?: number;
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
    hideZeroValues?: boolean;
    decimalDigits?: number;
};

export default function CustomPieChart({
    title,
    data,
    colorMapping,
    height = 300,
    innerRadius = 60,
    outerRadius = 120,
    hideZeroValues = false,
    decimalDigits = 2
}: PieChartProps) {
    const chartData = hideZeroValues ? data.filter((item) => item.value > 0) : data;

    return (
        <Box sx={styles.piechart}>
            {title && (
                <Typography variant="h6" sx={styles.title}>
                    {title}
                </Typography>
            )}

            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={chartData}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(decimalDigits)}%`}
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => {
                            const mapping = colorMapping.find(
                                (c) => c.name === entry.name
                            );

                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={mapping?.color || "#000000"}
                                />
                            );
                        })}
                    </Pie>

                    <Tooltip
                        formatter={(value) => [
                            value,
                            "Count",
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};
