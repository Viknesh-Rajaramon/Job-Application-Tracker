import { SxProps } from "@mui/material";

import { Styles } from "../../../types/common";

const actionButtonStyles: SxProps = {
	fontSize: "15px",
	minWidth: "120px",
	width: "max-content",
	height: "40px",
	padding: "12px 20px",
	borderRadius: "5px",
};

const styles: Styles = {
	wrapper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "632px",
		width: "632px",
		backgroundColor: "custom.background.gray",
		borderRadius: "5px",
		padding: "50px 64px 62px",
	},

	cancelBox: {
		position: "absolute",
		top: "5px",
		right: "3px",
		display: "flex",
		alignItems: "center",

		"&:hover": {
			backgroundColor: "transparent",
		},
	},

	closeIcon: {
		marginLeft: "10px",
		color: "black",
		fontSize: "30px",
	},

	contentBox: {
		"& .heading": {
			fontSize: "20px",
			fontWeight: "600",
			margin: "0 0 40px 0",
		},

		"& .description": {
			fontSize: "15px",
			color: "custom.text.main",
			margin: "40px 0 0 0",
		},

		"& .homeName": {
			fontSize: "20px",
			fontWeight: "bold",
			color: "black",
		},

		"& .address": {
			fontSize: "15px",
			color: "black",
		},

		"& .note": {
			fontSize: "12px",
			color: "error.main",
			marginTop: "5px",
			fontWeight: "500",
		},
	},

	actionButtons: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "40px",
	},

	actionLeft: {
		...actionButtonStyles,
		color: "black",
		borderStyle: "solid",
		borderColor: "custom.background.darkGray",
		borderWidth: "1px",
		backgroundColor: "white",
		"&:disabled": {
			backgroundColor: "primary.light",
			color: "white",
		},
	},

	actionRight: {
		...actionButtonStyles,
		marginLeft: "10px",
		backgroundColor: "primary.dark",
		"&:disabled": {
			backgroundColor: "primary.light",
			color: "white",
		},
	},

	progressWrapper: {
		marginLeft: "10px",
		width: "120px",
		height: "40px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	progressStyles: {
		width: "20px !important",
		height: "20px !important",
	},

	loaderTxtWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		gap: "5px",
		fontSize: "12px",
	},

	note: {
		position: "absolute",
		bottom: "12px",
		fontSize: "12px",
	},
};

export default styles;
