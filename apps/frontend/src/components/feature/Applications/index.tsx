import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GridCellParams, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";

import { getAllApplications } from "../../../api/application";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setApplicationData, setApplicationRowData } from "../../../redux/slices/user";
import DataGrid from "../../common/DataGrid";
import SearchBar from "../../common/SearchBar";
import Button from "../../common/Button";
import Link from "../../common/FormComponents/Link";
import { GridColumn } from "../../../types/common";
import { formatDate } from "../../../utils/common";
import ApplicationForm, { ApplicationFormData, FormType } from "./Form";

import { styles } from "./styles";

const ApplicationsPage = () => {
    const [form, setForm] = useState<FormType>(null);
    const [formData, setFormData] = useState<ApplicationFormData>();

    const {
        user: { applicationData }
    } = useAppSelector((state) => state);

    const [totalData, setTotalData] = useState(0);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState<number>(0);

    const dispatch = useAppDispatch();

    const handleApplication = (data: ApplicationFormData) => data;

    const onClickAdd = () => {
        setForm("add");
        setFormData({
            company: "",
            role: "",
            req_id: "",
            location: "",
            status: "",
            link: "",
        });
    };

    const onClickEdit = (data: ApplicationFormData) => {
        setForm("edit");
        setFormData(data);
    };

    const fetchApplications = async () => {
        const res = await getAllApplications({ page: paginationModel.page + 1, search, sortBy, order });
        return res.data;
    };

    const { data, refetch: refetchAllApplications } = useQuery({
        queryKey: ["getAllApplications", paginationModel.page, search, sortBy, order, applicationData],
        queryFn: fetchApplications,
    });

    useEffect(() => {
        if (data?.data) {
            setTotalData(data.total);
            dispatch(setApplicationData(data.data));
        }
    }, [data, dispatch]);

    const getSearchText = useCallback((text: string) => {
        setSearch(text.trim().toLowerCase());
    }, []);

    const handleSort = (sortModel: GridSortModel) => {
        if (sortModel.length > 0) {
            const { field, sort } = sortModel[0];
            setSortBy(field);
            setOrder(sort === "desc" ? 0 : 1);
        }
    };

    const renderRow = (params: GridCellParams) => {
        return (
            <Box
                sx={styles.tableLink}
                onClick={() => {
                    dispatch(setApplicationRowData(params.row));
                    onClickEdit(params.row);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        dispatch(setApplicationRowData(params.row));
                        onClickEdit(params.row);
                    }
                }}
                tabIndex={0}
            >
                {params.row.company}
            </Box>
        );
    };

    const applicationColumn: GridColumn[] = [
        {
            field: "id",
            headerName: "ID",
            sortable: false,
            flex: 1,
            hide: true,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "created_at",
            headerName: "Date",
            sortable: true,
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row: { created_at } }: GridCellParams) => formatDate(created_at),
        },
        {
            field: "company",
            headerName: "Company",
            sortable: true,
            flex: 1.5,
            headerAlign: "center",
            align: "left",
            renderCell: renderRow,
        },
        {
            field: "role",
            headerName: "Role",
            sortable: false,
            flex: 3,
            headerAlign: "center",
            align: "left",
        },
        {
            field: "req_id",
            headerName: "Req ID",
            sortable: false,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "location",
            headerName: "Location",
            sortable: false,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "status",
            headerName: "Status",
            sortable: true,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "link",
            headerName: "Link",
            sortable: false,
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row: { link } }: GridCellParams) => <Link link={link} label={"Open"} />,
        },
    ];

    const visibleColumns = applicationColumn.filter((col) => col.hide !== true);

    return (
        <Box>
            {!form ? (
                <Box sx={styles.tablewrapper}>
                    <Box sx={styles.heading}>Applications</Box>

                    <Box sx={styles.topbar}>
                        <Box sx={styles.searchBar}>
                            <SearchBar getText={getSearchText} />
                        </Box>

                        <Box sx={styles.btnWrapper}>
                            <Button
                                label="Add Application"
                                sx={styles.btn}
                                onClick={onClickAdd}
                            />
                        </Box>
                    </Box>

                    <DataGrid
                        rows={applicationData || []}
                        columns={visibleColumns}
                        loading={false}
                        rowCount={totalData}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        sortingMode="server"
                        onSortModelChange={(sortModel) => handleSort(sortModel)}
                        emptyTable="No Applications added yet."
                    />
                </Box>
            ) : (
                <Box sx={styles.formBtnWrapper}>
                    <ApplicationForm
                        title={form === "add" ? "Add Application" : "Edit Application"}
                        btnLabel={form === "add" ? "" : "Edit Application"}
                        submitBtnLabel={form === "add" ? "Add Application" : "Save Application"}
                        viewOnly={form === "edit"}
                        data={formData}
                        onSubmitForm={handleApplication}
                        refetchAllApplications={refetchAllApplications}
                        form={form}
                        setForm={setForm}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ApplicationsPage;
