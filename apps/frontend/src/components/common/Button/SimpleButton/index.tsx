import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import { ComponentProps } from "react";

import styles from "./styles";

type SimpleButtonProps = ComponentProps<typeof Button> & {
    label: string;
    customStyles?: SxProps;
    icon?: boolean;
    children?: React.ReactNode;
};

const SimpleButton = ({
    label,
    variant = "contained",
    customStyles,
    icon = false,
    children,
    ...rest
}: SimpleButtonProps) => {
    return (
        <Button
            sx={{ ...styles.wrapper, ...customStyles } as SxProps}
            variant={variant}
            {...rest}
        >
            {icon ? (
                <Box sx={styles.btnStyles}>
                    {children} {label}
                </Box>
            ) : (
                label
            )}
        </Button>
    );
};

export default SimpleButton;
