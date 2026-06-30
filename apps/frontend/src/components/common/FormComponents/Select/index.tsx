import { Box, FormHelperText, InputLabel, MenuItem, TextField, TextFieldProps } from "@mui/material";
import { SxProps } from "@mui/system";
import {
    Controller,
    FieldErrors,
    FieldPathValue,
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";

import { getError } from "../../../../utils/common";
import { mergeSx } from "../../../../utils/helper";

import styles from "./styles";

type SelectProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<TextFieldProps, "name" | "defaultValue" | "value" | "onChange"> & {
        errors?: FieldErrors<T>;
        options: { label: string; value: string }[];
        customStyle?: { [key: string]: SxProps };
        defaultValue?: FieldPathValue<T, FieldPath<T>>;
    };

const Select = <T extends FieldValues>({
    name,
    control,
    label,
    fullWidth = true,
    errors,
    customStyle,
    variant = "outlined",
    options,
    defaultValue,
    rules,
    ...rest
}: SelectProps<T>) => {
    const error = errors ? getError(name, errors) : undefined;

    return (
        <Box sx={mergeSx(styles.container, customStyle?.containerWrapper)}>
            <InputLabel
                shrink
                className="label"
                sx={mergeSx(styles.label, customStyle?.input)}
                required={Boolean(rules?.required)}
                htmlFor={name}
            >
                {label}
            </InputLabel>

            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Box sx={mergeSx(styles.wrapper, customStyle?.wrapper)}>
                        <TextField
                            sx={customStyle?.input}
                            id={name}
                            select
                            variant={variant}
                            fullWidth={fullWidth}
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            onBlur={field.onBlur}
                            error={Boolean(error)}
                            {...rest}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                )}
                {...rest}
            />

            {error && (
                <FormHelperText sx={styles.error}>
                    {error.message}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Select;
