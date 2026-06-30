import { Styles } from "../../types/common";

export const styles: Styles = {
	wrapper: {
		display: "flex",
		alignItems: "stretch",
		width: "100%",
		height: "100%",
		padding: {
			xl: "0",
			lg: "0",
			md: "0",
			sm: "0",
			xs: "96px 0 60px 0",
		},

		flexDirection: {
			xl: "row",
			lg: "row",
			md: "row",
			sm: "row",
			xs: "column",
		},

		"& .children": {
			backgroundColor: {
				xl: "custom.background.main",
				lg: "custom.background.main",
				md: "custom.background.main",
				sm: "custom.background.main",
				xs: "white",
			},
		},
	},

	image: {
		height: {
			xl: "140px",
			lg: "140px",
			md: "140px",
			sm: "140px",
			xs: "56px",
		},
		width: {
			xl: "312px",
			lg: "312px",
			md: "312px",
			sm: "312px",
			xs: "125px",
		},
	},

	main: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexBasis: "50%",
		height: "100vh",
		marginTop: {
			xl: "0",
			lg: "0",
			md: "0",
			sm: "0",
			xs: "25px",
		},
	},
};
