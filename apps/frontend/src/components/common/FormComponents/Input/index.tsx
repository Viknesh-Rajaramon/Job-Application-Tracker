import Close from "@mui/icons-material/Close";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	FormControl,
	FormControlProps,
	FormHelperText,
	InputAdornment,
	InputBaseProps,
	InputLabel,
	SxProps,
	Theme,
} from "@mui/material";
import {
	Controller,
	FieldErrors,
	FieldValues,
	Path,
	UseControllerProps,
} from "react-hook-form";

import { getError } from "../../../../utils/common";
import { preventNumberInput, mergeSx } from "../../../../utils/helper";

import styles, { InputBase } from "./styles";

type InputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<FormControlProps, "onChange"> &
	Omit<InputBaseProps, "name" | "value" | "defaultValue" | "onChange"> & {
		name: Path<T>;
		label: string;
		errors?: FieldErrors<T>;
		maxLength?: number;
		customStyles?: SxProps<Theme>;
		readOnly?: boolean;
		showAdornment?: boolean;
		adornmentPos?: "start" | "end";
		placeholder?: string;
		autoFocus?: boolean;
		isValid?: boolean;
		isAlpha?: boolean;
		customStyle?: {
			wrapper?: SxProps<Theme>;
			input?: SxProps<Theme>;
			inputField?: SxProps<Theme>;
		};
	};

const Input = <T extends FieldValues>({
	name,
	control,
	label,
	type = "text",
	fullWidth = true,
	errors,
	disabled = false,
	rules,
	customStyles,
	maxLength,
	inputProps,
	placeholder,
	isAlpha = false,
	showAdornment = false,
	adornmentPos = "end",
	variant = "standard",
	className,
	isValid = false,
	readOnly = false,
	autoFocus = false,
	customStyle,
	...rest
}: InputProps<T>) => {
	const error = errors ? getError(name, errors) : undefined;

	return (
		<Box sx={mergeSx(styles.wrapper, customStyle?.wrapper)}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<FormControl
						sx={customStyles}
						fullWidth={fullWidth}
						variant={variant}
						className={className}
					>
						<Box>
							<InputLabel
								shrink
								className="label"
								disabled={disabled}
								sx={mergeSx(styles.label, customStyle?.input)}
								required={Boolean(rules?.required)}
								htmlFor={name}
							>
								{label}
							</InputLabel>

							<InputBase
								id={name}
								sx={mergeSx(styles.input, customStyle?.inputField)}
								type={type}
								disabled={disabled}
								value={field.value ?? ""}
								onChange={field.onChange}
								inputRef={field.ref}
								onBlur={field.onBlur}
								readOnly={readOnly}
								placeholder={placeholder}
								autoFocus={autoFocus}
								onKeyDown={isAlpha ? preventNumberInput : undefined}
								inputProps={{ maxLength, ...inputProps }}
								style={{ background: readOnly ? "none" : "white" }}
								startAdornment={
									showAdornment && adornmentPos === "start" ? (
										<InputAdornment
											aria-label="Search Icon"
											sx={styles.adornment}
											position="start"
										>
											<SearchIcon />
										</InputAdornment>
									) : undefined
								}
								endAdornment={
									showAdornment && adornmentPos === "end" ? (
										<InputAdornment
											aria-label="Search Icon"
											sx={styles.adornment}
											position="end"
										>
											{error ? (
												<Close color="error" />
											) : field.value ? (
												<DoneRoundedIcon sx={styles.doneIcon} />
											) : null}
										</InputAdornment>
									) : undefined
								}
								error={Boolean(error)}
								hasError={Boolean(error) && showAdornment}
								valid={isValid}
								{...rest}
							/>
						</Box>

						{error && (
							<FormHelperText sx={styles.error}>
								{error.message}
							</FormHelperText>
						)}
					</FormControl>
				)}
				{...rest}
			/>
		</Box>
	);
};

export default Input;
