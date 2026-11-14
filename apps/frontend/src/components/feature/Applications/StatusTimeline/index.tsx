import { Box, Chip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getApplicationStatuses } from "../../../../api/application";
import { ApplicationStatusHistory } from "../../../../types/application";
import { useAppSelector } from "../../../../redux/store";
import { formatDate } from "../../../../utils/common";

type Props = {
    applicationId: string;
    // Changing this (e.g. the current status) re-fetches the history.
    refreshKey?: string;
};

const StatusTimeline = ({ applicationId, refreshKey }: Props) => {
    const colors = useAppSelector((state) => state.user.applicationStatusesColor);

    const { data, isLoading } = useQuery({
        queryKey: ["getApplicationStatuses", applicationId, refreshKey],
        queryFn: async () => (await getApplicationStatuses(applicationId)).data,
        enabled: !!applicationId,
    });

    const history: ApplicationStatusHistory[] = data?.data || [];

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Status History</Typography>

            {isLoading && <Typography variant="body2">Loading…</Typography>}
            {!isLoading && history.length === 0 && (
                <Typography variant="body2">No status changes recorded yet.</Typography>
            )}

            {history.map((entry, index) => (
                <Box
                    key={`${entry.status}-${entry.created_at}`}
                    sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.75 }}
                >
                    <Chip
                        label={entry.status}
                        size="small"
                        sx={{ minWidth: 110, ...(colors[entry.status] ? { backgroundColor: colors[entry.status] } : {}) }}
                    />
                    <Typography variant="body2">{formatDate(entry.created_at)}</Typography>
                    {index === 0 && (
                        <Typography variant="caption" color="text.secondary">current</Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default StatusTimeline;
