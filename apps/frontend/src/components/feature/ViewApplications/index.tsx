import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GridSortModel } from "@mui/x-data-grid";

import { getAllApplications } from "../../../api/application";
import { useAppSelector } from "../../../redux/store";
import DataGrid from "../../common/DataGrid";
import SearchBar from "../../common/SearchBar";

import { columns } from "./columns";
import { styles } from "./styles";
import { useCallback, useEffect, useState } from "react";

const ViewApplications = () => {
    const isSignedIn = useAppSelector((state) => state.user.isSignedIn);

    const [applications, setApplications] = useState<any>();
    const [totalData, setTotalData] = useState(0);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState<number>(0);
    
    const fetchApplications = async () => {
        const res = await getAllApplications({ page: paginationModel.page+1, search, sortBy, order });
        return res.data;
    };

    const { data: allApplications } = useQuery({
        queryKey: ["getAllApplications", paginationModel.page, search, sortBy, order],
        queryFn: fetchApplications,
    });

    useEffect(() => {
        if (allApplications?.data) {
            setApplications(allApplications.data);
            setTotalData(allApplications.total);
        }
    }, [allApplications]);

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

    const visibleColumns = columns.filter((col) => col.hide !== true);

    return (
        <>
            {isSignedIn ? (
                <Box>
                    <Box sx={styles.heading}>Applications</Box>

                    <Box sx={styles.searchBar}>
                        <SearchBar getText={getSearchText} />
                    </Box>

                    <DataGrid
                        rows={applications}
                        columns={visibleColumns}
                        loading={false}
                        rowCount={totalData}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        sortingMode="server"
                        onSortModelChange={(sortModel) => handleSort(sortModel)}
                        emptyTable="No applications added yet."
                    />
                </Box>
            ) : (
                <Box sx={styles.emptyBg} />
            )}
        </>
    );
};

export default ViewApplications;
