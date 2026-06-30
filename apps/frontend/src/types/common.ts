import { SxProps } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export type Styles = {
	[key: string]: SxProps;
};

export type SidebarMenu = {
	icon?: string;
	name: string;
	route?: string;
};

export type GridColumn = GridColDef & {
	hide?: boolean;
};
