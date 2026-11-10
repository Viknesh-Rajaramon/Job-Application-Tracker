/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		[key: string]: any;
	}
	interface TypographyVariantsOptions {
		[key: string]: any;
	}
	interface Palette {
		[key: string]: any;
	}
	interface PaletteOptions {
		[key: string]: any;
	}
}

// Create a theme instance.
let theme = createTheme({
	palette: {
		primary: {
			main: "#030303",
			light: "#82b7f3",
			dark: "#056ee6",
		},
		secondary: amber,
		success: {
			main: "#77e457",
			light: "#7fe189",
		},
		error: {
			main: "#c0291d",
			light: "#e98b8b",
		},

		custom: {
			background: {
				main: "#e6f1fd",
				secondary: "#f2f8ff",
				gray: "#f3f5f8",
				lightGray: "#ccd6e2",
				darkGray: "#7f7f7f",
				input: "#fbfbfb",
				dropdownCta: "#056EE6",
			},

			misc: {
				main: "#8099b6",
				secondary: "#d6d6d6",
				green: "#50ac48",
				antiFlashWhite: "#f3f3f3",
				water: "#cde2fa",
				trueBlue: "#030303",
				joyBlue: "#82B7F3",
				outerSpace: "#484848",
				newBlue: "#066ee6",
			},

			text: {
				main: "#000000",
				secondary: "#333333",
				light: "#565656",
				textGray: "#000000de",
				darkGray: "#7f7f7f",
				grayish: "#505050",
				white: "#ffffff",
			},

			border: {
				main: "#7F7F7F",
				white: "#ffffff",
			},
		},
	},

	typography: {
		fontFamily: ["DMSans", "sans-serif"].join(", "),
		font: {
			openSans: {
				fontFamily: ["Open Sans", "sans-serif"].join(", "),
			},
		},
	},
});

/**
 * Mui components styles overrides
 */
theme = createTheme(theme, {
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					"& *": {
						"&::-webkit-scrollbar ": {
							margin: "15px",
							width: "8px",
							borderRadius: "100px",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: "white",
							borderRadius: "100px",
							borderWidth: "2px",
							borderStyle: "solid",
							borderColor: theme.palette.custom.misc.main,
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.custom.misc.main,
							borderRadius: "100px",
							borderWidth: "2px",
							maxHeight: "30px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							zoom: 1.1,
						},
					},
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "capitalize",
				},
			},
		},

		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: "15px",
					[theme.breakpoints.down("sm")]: {
						fontSize: "14px",
					},
					color: "black",
					fontWeight: "bold",
					"&.Mui-focused": {
						color: "black",
					},
					transform: "none",
				},
				asterisk: {
					marginLeft: "6px",
					color: theme.palette.error.main,
					"&$error": {
						color: theme.palette.error.main,
					},
				},
			},
		},

		MuiInputBase: {
			styleOverrides: {
				root: {
					"label + &": {
						marginTop: "20px",
						[theme.breakpoints.down("sm")]: {
							marginTop: "18px",
						},
					},
					height: "40px",
					boxSizing: "border-box",
					borderRadius: 5,
					backgroundColor: theme.palette.background.paper,
					position: "relative",
					borderWidth: 1,
					borderStyle: "solid",
					fontSize: "14px",
					padding: "10px 8px",
					background: "white",
					width: "100%",
					[theme.breakpoints.down("sm")]: {
						fontSize: "12px",
						height: "43px",
					},
					"&.Mui-error": {
						borderColor: `${theme.palette.error.main} !important`,
						color: theme.palette.error.main,
					},
					"&.Mui-focused": {
						borderColor: "black",
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: "12px",
					fontWeight: "500",
					color: theme.palette.error.main,
					position: "absolute",
					bottom: "-22px",
					[theme.breakpoints.down("sm")]: {
						fontSize: "10px",
						bottom: "-20px",
					},
					MuiDivider: {
						styleOverrides: {
							root: {
								borderBottomWidth: "1px",
								borderBottomStyle: "solid",
								borderBottomColor: theme.palette.primary.light,
							},
						},
					},
				},
			},
		},
	},
});

const customTypography = {};

theme = {
	...theme,
	typography: {
		...theme.typography,
		...customTypography,
	},
};

theme = responsiveFontSizes(theme);

export default theme;
