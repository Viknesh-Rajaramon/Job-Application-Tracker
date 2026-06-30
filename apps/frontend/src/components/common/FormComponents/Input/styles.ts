import { InputBase as MuiInputbase } from "@mui/material";
import { styled } from "@mui/system";

import { Styles } from "../../../../types/common";

const styles: Styles = {
	wrapper: {
		width: "100%",
		"& .label": {
			display: "inline",
			fontSize: "15px",
			width: "110px",
		},
	},

	adornment: {
		position: "relative",
	},

	label: {
		position: "static",
		display: "block",
		fontSize: "15px",
		marginBottom: "20px",
	},

	input: {
		flexGrow: 1,
		"& .MuiInputBase-input": {
			MozAppearance: "textfield",
			"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
				WebkitAppearance: "none",
				MozAppearance: "textfield",
				"&::-moz-focus-inner": {
					borderStyle: "none",
				},
			},
		},
	},

	error: {
		marginLeft: "110px",
	},

	doneIcon: {
		color: "custom.misc.green",
	},
};

type InputBaseProps = {
	hasError: boolean;
	valid: boolean;
};

export const InputBase = styled(MuiInputbase, {
	shouldForwardProp: (prop) =>
		prop !== "hasError" && prop !== "typed" && prop !== "valid",
})(({ hasError, valid }: InputBaseProps) =>
({
	"&.MuiInputBase-root": {
		borderColor: valid ? "green" : hasError ? "red" : "custom.border.main",
	},
})
);

export default styles;
