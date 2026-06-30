import { GridCellParams } from "@mui/x-data-grid";

import Link from "../../common/FormComponents/Link";
import { formatDate } from "../../../utils/common";
import { GridColumn } from "../../../types/common";

export const columns: GridColumn[] = [
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
