import {
    Box,
    FormControl,
    FormControlProps,
    FormHelperText,
    InputBaseProps,
    InputLabel,
    TextareaAutosize,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { CSSProperties } from "react";
import {
    Controller,
    FieldErrors,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import { getError } from "../../../../utils/common";
import styles from "./styles";

type InputProps<T extends FieldValues> = UseControllerProps<T> &
    FormControlProps &
    InputBaseProps & {
        label: string;
        errors?: FieldErrors;
        maxLength?: number;
        customStyles?: SxProps;
        labelPos?: boolean;
        minRows: number;
        maxRows: number;
        readonly?: boolean;
    };

const TextArea = <T extends FieldValues>({
    name,
    control,
    label,
    fullWidth = true,
    labelPos = false,
    minRows = 5,
    maxRows = 5,
    errors,
    disabled = false,
    rules,
    customStyles,
    readOnly = false,
    className,
    maxLength = 250,
    ...rest
}: InputProps<T>) => {
    const error = errors ? getError(name, errors) : undefined;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            {...rest}
            render={({ field }) => (
                <FormControl
                    sx={customStyles}
                    fullWidth={fullWidth}
                    variant="outlined"
                    className={className}
                    error={!!error}
                >
                    <Box sx={styles.wrapper}>
                        <Box className="labelPos">
                            <InputLabel
                                shrink
                                className="label"
                                disabled={disabled}
                                required={!!rules?.required}
                                htmlFor={`input-base-${name}`}
                            >
                                {label}
                            </InputLabel>

                            <TextareaAutosize
                                id={`input-base-${name}`}
                                style={{
                                    ...(styles.txtAreaAuto as CSSProperties),
                                    backgroundColor: readOnly ? "transparent" : "white",
                                }}
                                className="textarea"
                                disabled={disabled}
                                readOnly={readOnly}
                                value={field.value}
                                maxRows={maxRows}
                                minRows={minRows}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                maxLength={maxLength}
                            />

                            <Box sx={styles.counterStyles}>
                                {`${field?.value?.length || 0}/${maxLength}`}
                            </Box>
                        </Box>
                    </Box>

                    {error && (
                        <FormHelperText sx={styles.error}>{error.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default TextArea;
