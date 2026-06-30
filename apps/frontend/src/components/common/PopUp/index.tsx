import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box, SxProps } from "@mui/system";
import { ComponentProps } from "react";

import styles from "./styles";

export type Action = {
    label?: string;
    actionCustomStyles?: { [key: string]: SxProps };
} & ComponentProps<typeof Button>;

type PopUpProps = {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    actionLeft: Action;
    actionRight: Action;
    heading: string;
    handleRightBtnClick?: () => void;
    loading?: boolean;
    loadingText?: string;
    customStyles?: { [key: string]: SxProps };
    note?: string;
};

const PopUp = ({
    open,
    handleClose,
    children,
    actionLeft,
    actionRight,
    handleRightBtnClick,
    heading,
    loading = false,
    loadingText,
    customStyles,
    note,
}: PopUpProps) => {
    const {
        label: actionLeftLabel,
        hidden: actionLeftHidden,
        onClick: actionLeftOnClick,
    } = actionLeft;

    const {
        label: actionRightLabel,
        hidden: actionRightHidden,
        color: actionRightColor,
        type: actionRightType,
        disabled: actionRightDisabled,
        onClick: actionRightOnClick,
        actionCustomStyles: actionRightStyles,
    } = actionRight;

    const newActionLeft = {
        label: actionLeftLabel || "Cancel",
        onClick: actionLeftOnClick || handleClose,
    };

    const newActionRight = {
        label: actionRightLabel || "Okay",
        color: actionRightColor || "primary",
        type: actionRightType || "button",
        disabled: actionRightDisabled || false,
        onClick: actionRightOnClick || handleClose,
        actionCustomStyles: actionRightStyles || {},
    };

    return (
        <Modal
            open={open}
            onClose={(_, reason) => {
                if (reason !== "backdropClick")
                    handleClose();
            }}
        >
            <Box sx={{ ...styles.wrapper, ...customStyles?.wrapper } as SxProps}>
                <Button
                    sx={styles.cancelBox}
                    onClick={handleClose}
                    aria-label="close icon"
                >
                    <CloseIcon sx={styles.closeIcon} />
                </Button>

                <Box sx={styles.contentBox}>
                    <Typography className="heading" component="div">
                        {heading}
                    </Typography>

                    {children}
                    
                    {!actionRightHidden && (
                        <Box
                            sx={
                                {
                                    ...styles.actionButtons,
                                    ...customStyles?.button,
                                } as SxProps
                            }
                        >
                            {!actionLeftHidden && !loading && (
                                <Button
                                    variant="text"
                                    sx={
                                        {
                                            ...styles.actionLeft,
                                            ...customStyles?.button,
                                            ...customStyles?.leftActionButton,
                                        } as SxProps
                                    }
                                    onClick={newActionLeft.onClick}
                                >
                                    {newActionLeft?.label}
                                </Button>
                            )}

                            {!actionRightHidden &&
                                (!loading ? (
                                    <Button
                                        variant="contained"
                                        sx={
                                            {
                                                ...styles.actionRight,
                                                ...customStyles?.button,
                                                ...actionRightStyles?.button,
                                            } as SxProps
                                        }
                                        onClick={handleRightBtnClick}
                                        color={newActionRight.color}
                                        type={newActionRight.type}
                                        disabled={newActionRight.disabled}
                                    >
                                        {newActionRight?.label}
                                    </Button>
                                ) : (
                                    <Box sx={styles.loaderTxtWrapper}>
                                        <Box sx={styles.progressWrapper}>
                                            <CircularProgress sx={styles.progressStyles} />
                                        </Box>
                                        {loadingText}
                                    </Box>
                                ))}
                        </Box>
                    )}
                    
                    {note && <Box sx={styles.note}>{note}</Box>}
                </Box>
            </Box>
        </Modal>
    );
};

export default PopUp;
