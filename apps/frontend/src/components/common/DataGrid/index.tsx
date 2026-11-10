import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import {
    Box,
    Pagination as MatPagination,
    PaginationItem,
    SxProps,
} from "@mui/material";
import {
    DataGrid as MatDataGrid,
    DataGridProps as MatDataGridProps,
    GridPaginationModel,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";

import { styles } from "./styles";

type DataGridProps = MatDataGridProps & {
    emptyTable?: string;
    customStyles?: SxProps;
};

const SortIconAsc = () => (
    <Box sx={styles.iconStyles}>
        <ArrowDropDownRoundedIcon fontSize="large" />
    </Box>
);

const SortIconDesc = () => (
    <Box sx={styles.iconStyles}>
        <ArrowDropUpRoundedIcon fontSize="large" />
    </Box>
);

type PaginationProps = {
    hideFooterPagination?: boolean;
};

const CustomPagination = ({ hideFooterPagination }: PaginationProps) => {
    const apiRef = useGridApiContext();

    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Box sx={styles.paginationWrapper}>
            {!hideFooterPagination && (
                <MatPagination
                    color="primary"
                    count={pageCount || 1}
                    page={page + 1}
                    sx={styles.pagination}
                    onChange={(_, value) => apiRef.current.setPage(value - 1)}
                    renderItem={(item) => (
                        <PaginationItem sx={styles.paginationItem} {...item} />
                    )}
                />
            )}
        </Box>
    );
};

const DataGrid = ({
    rows,
    columns,
    autoHeight = true,
    checkboxSelection = false,
    disableColumnFilter = true,
    disableColumnMenu = true,
    hideFooterPagination = false,
    loading = false,
    paginationModel,
    onPaginationModelChange,
    customStyles = {},
    pageSizeOptions = [10],
    rowCount = 10,
    emptyTable = "No Data Available",
    paginationMode = "server",
    ...rest
}: DataGridProps) => {
    return (
        <Box sx={{ ...styles.dataGridWrapper, ...customStyles } as SxProps}>
            <MatDataGrid
                sx={styles.grid}
                rows={rows}
                columns={columns}
                autoHeight={autoHeight}
                checkboxSelection={checkboxSelection}
                disableColumnFilter={disableColumnFilter}
                disableColumnMenu={disableColumnMenu}
                loading={loading}
                sortingOrder={["asc", "desc"]}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange as ((model: GridPaginationModel) => void) | undefined}
                density="standard"
                pageSizeOptions={pageSizeOptions}
                rowCount={rowCount}
                hideFooterPagination={hideFooterPagination}
                paginationMode={paginationMode}
                slots={{
                    noRowsOverlay: () => <Box sx={styles.noRows}>{emptyTable}</Box>,
                    columnResizeIcon: () => null,
                    columnSortedAscendingIcon: SortIconAsc,
                    columnSortedDescendingIcon: SortIconDesc,
                    pagination: () => <CustomPagination hideFooterPagination={hideFooterPagination} />,
                }}
                {...rest}
            />
        </Box>
    );
};

export default DataGrid;
