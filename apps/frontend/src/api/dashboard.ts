import { adminInstance } from "./client";

export const getDashboardStats = (groupBy: string) => {
    return adminInstance.get(`/dashboard?group_by=${groupBy}`);
};
