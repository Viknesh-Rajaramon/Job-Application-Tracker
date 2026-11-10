import { styled } from "@mui/system";
import { Styles } from "../../types/common";

export const styles: Styles = {
	wrapper: {
		display: "flex",
		minHeight: "100vh",
	},

	left: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "192px",
		height: "100vh",
		backgroundColor: "custom.background.secondary",
		paddingTop: "20px",
		boxSizing: "border-box",
		borderRight: "1px solid #82b7f3",
	},

	sidebar: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		fontSize: "14px",
		height: "100%",
		minWidth: "192px",
		"& a": {
			textDecoration: "none",
			color: "primary.main",
		},
	},

	item: {
		fontSize: "16px",
		fontWeight: "bold",
		textDecoration: "none",
	},

	divider: {
		backgroundColor: "#82b7f3",
		margin: "0 20px",
	},

	right: {
		flex: 1,
		minWidth: 0,
		minHeight: "100vh",
		marginLeft: "220px",
		padding: "20px",
		boxSizing: "border-box",
	},
};

type MenuItemStyleProps = {
	matchedRoute: boolean;
};

export const MenuItem = styled("div", {
	shouldForwardProp: (prop) => prop !== "matchedRoute",
})(({ matchedRoute }: MenuItemStyleProps) =>
({
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	borderWidth: "0 0 0 2px",
	borderStyle: "solid",
	padding: "20px",
	borderColor: matchedRoute ? "primary.dark" : "white",
	color: matchedRoute ? "primary.main" : "custom.text.grayish",
	"& .icon": {
		marginRight: "8px",
	},
}),
);
