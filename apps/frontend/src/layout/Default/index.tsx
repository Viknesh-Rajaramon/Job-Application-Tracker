import { Box, Divider } from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import { signoutAction } from "../../redux/slices/signOut";
import { route } from "../../constants/routes";
import { sidebarMenu } from "../../constants/common";
import PopUp, { Action } from "../../components/common/PopUp";

import { styles, MenuItem } from "./styles";
import SimplePopUp from "../../components/common/PopUp/Modal/SimplePopUp";

type ModalData = {
    heading: string;
    actionLeft: Action;
    actionRight: Action;
};

type InfoModal = ModalData & {
    props: {
        description: string;
    };
};

export const DefaultLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const [openModal, setOpenModal] = useState(false);

    const signoutModal: InfoModal = {
        heading: "Sign Out",
        props: {
            description: "Are you sure you want to Sign Out?",
        },
        actionLeft: {
            label: "Cancel",
        },
        actionRight: {
            label: "Yes",
        },
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSignout = () => {
        setOpenModal(false);
        dispatch(signoutAction({ isSignedIn: false }));
        navigate(route.signIn.path, { replace: true });
    };

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.left}>
                <Box sx={styles.sidebar}>
                    {sidebarMenu.map((item) => (
                        <Box key={item.name} sx={styles.item}>
                            {item.route ? (
                                <Link to={item.route}>
                                    <MenuItem matchedRoute={location.pathname === item.route}>
                                        <Box>{item.name}</Box>
                                    </MenuItem>
                                </Link>
                            ) : (
                                <MenuItem
                                    matchedRoute={false}
                                    onClick={() => setOpenModal(true)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <Box>{item.name}</Box>
                                </MenuItem>
                            )}

                            <Divider sx={styles.divider} />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={styles.right}>
                <Outlet />
            </Box>

            <PopUp
                open={!!openModal}
                handleClose={handleClose}
                heading={signoutModal.heading}
                actionLeft={signoutModal.actionLeft}
                actionRight={signoutModal.actionRight}
                handleRightBtnClick={handleSignout}
            >
                <SimplePopUp description={signoutModal.props.description} />
            </PopUp>
        </Box>
    );
};
