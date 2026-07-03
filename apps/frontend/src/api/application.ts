import { adminInstance } from "./client";

export const getAllApplications = ({
    page,
    search,
    sortBy,
    order,
    perPage,
}: {
    page: number;
    search: string;
    sortBy: string;
    order: number;
    perPage?: number
}) => {
    return adminInstance.get(`/applications?page=${page}&per_page=${perPage || 10}&sort_by=${sortBy}&order=${order}${!!search ? `&search=${search}` : ``}`);
};

export const createApplication = (data: any) => {
    return adminInstance.post("/applications", data);
};

export const updateApplicationById = async ({
    applicationId,
    updatedData,
}: {
    applicationId: string;
    updatedData: any;
}) => {
    return adminInstance.put(`/applications/${applicationId}`, updatedData);
};
