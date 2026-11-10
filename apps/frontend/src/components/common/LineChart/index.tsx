import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { LineChartData } from "../../../types/charts";

import { styles } from "./styles";

interface LineChartProps {
    title?: string;
    data: LineChartData[];
    options: {
        label: string;
        value: string;
    }[];
    onOptionChange: (value: string) => void;
    xAxisFormatter?: (value: string) => string;
    height?: number;
};

export default function CustomLineChart({
    title,
    data,
    options,
    onOptionChange,
    xAxisFormatter,
    height = 300,
}: LineChartProps) {
    const [selectedOption, setSelectedOption] = useState(options[0]?.value || "");

    const handleChange = (value: string) => {
        setSelectedOption(value);
        onOptionChange(value);
    };

    return (
        <Box sx={styles.linechart}>
            <Box>
                {title && (
                    <Typography variant="h6" sx={styles.title}>
                        {title}
                    </Typography>
                )}

                <Select
                    value={selectedOption}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        tickFormatter={xAxisFormatter}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Line
                        type="linear"
                        dataKey="count"
                        stroke="#0000ff"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};
