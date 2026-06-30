import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Box, Popover } from "@mui/material";
import useToggleState from "../../../hooks/useToggleState";
import { useState } from "react";
import React from "react";
import styles from "./styles";

type DropDownProps = {
    title: string;
    id: string;
    setOpenModal: any;
    menuItems: {
        label: string;
        onClick: () => void;
    }[];
};

const DropDown = ({ menuItems, title, id, setOpenModal }: DropDownProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [state, toggleState] = useToggleState(false);

    const handleClose = () => {
        setOpenModal(false);
        setAnchorEl(null);
        toggleState();
    };

    return (
        <>
            <Box
                sx={styles.title}
                onClick={(event) => {
                    toggleState();
                    setAnchorEl(event.currentTarget);
                }}
            >
                {title}

                {state ? (
                    <KeyboardArrowUpRoundedIcon sx={styles.icon} />
                ) : (
                    <KeyboardArrowDownRoundedIcon sx={styles.icon} />
                )}
            </Box>

            <Popover
                id={id}
                open={state}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box sx={styles.dropdown}>
                    {menuItems.map(({ label, onClick }, index) => (
                        <React.Fragment key={label}>
                            <Box
                                sx={styles.dropdownItems}
                                key={label}
                                tabIndex={0}
                                onClick={() => {
                                    onClick();
                                    toggleState();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onClick();
                                        toggleState();
                                    }
                                }}
                            >
                                {label}
                            </Box>
                            
                            {index !== menuItems.length - 1 && <Box sx={styles.divider} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export default DropDown;
