import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    Box,
    FormControl,
    FormControlProps,
    FormHelperText,
    InputBase,
    InputLabel,
    SxProps,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import {
    Controller,
    FieldErrors,
    FieldValues,
    UseControllerProps,
    UseFormGetValues,
} from "react-hook-form";

import { getError } from "../../../../utils/common";
import regex from "../../../../utils/regex";
import styles from "./styles";

type PasswordProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<FormControlProps, "onChange"> & {
        label: string;
        errors?: FieldErrors;
        customStyles?: SxProps;
        showHelperText?: boolean;
        getValues?: UseFormGetValues<T>;
    };

const Password = <T extends FieldValues>({
    name,
    control,
    label,
    variant = "standard",
    fullWidth = true,
    disabled = false,
    errors,
    rules,
    customStyles,
    className,
    showHelperText = false,
    getValues,
    ...rest
}: PasswordProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const error = errors ? getError(name, errors) : undefined;
    const { passwordCriteria } = regex;
    const showError = !!error;

    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field }) => (
                <FormControl
                    sx={customStyles}
                    fullWidth={fullWidth}
                    variant={variant}
                    className={className}
                >
                    <InputLabel
                        shrink
                        className="label"
                        required={!!rules?.required}
                        disabled={disabled}
                        htmlFor={name}
                    >
                        {label}
                    </InputLabel>

                    <InputBase
                        id={name}
                        fullWidth={fullWidth}
                        disabled={disabled}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type={showPassword ? "text" : "password"}
                        inputRef={field.ref}
                        error={showError}
                        endAdornment={
                            <InputAdornment position="start" sx={styles.InputAdornment}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={styles.iconBtn}
                                >
                                    {showPassword ? (
                                        <VisibilityOutlinedIcon
                                            sx={{
                                                ...styles.icon,
                                                color: error ? "error.light" : "inherit",
                                            }}
                                        />
                                    ) : (
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                ...styles.icon,
                                                color: error ? "error.light" : "inherit",
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {error && <FormHelperText>{error.message}</FormHelperText>}
                    
                    {showHelperText && !error && (
                        <FormHelperText sx={styles.customError}>
                            {[
                                {
                                    regexCase: passwordCriteria.eightChar,
                                    text: "8 Characters |",
                                },
                                { regexCase: passwordCriteria.upper, text: "1 Uppercase |" },
                                { regexCase: passwordCriteria.lower, text: "1 Lowercase |" },
                                { regexCase: passwordCriteria.digit, text: "1 Digit |" },
                                {
                                    regexCase: passwordCriteria.specialChar,
                                    text: "1 Special Character",
                                },
                            ].map(({ regexCase, text }) => (
                                <Box
                                    key={text}
                                    sx={{
                                        color:
                                            getValues && regexCase.test(getValues(name).toString())
                                                ? "green"
                                                : "black",
                                    }}
                                >
                                    {text}
                                </Box>
                            ))}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
            {...rest}
        />
    );
};
export default Password;
