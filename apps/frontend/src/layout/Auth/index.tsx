import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { styles } from "./styles";

export const AuthLayout = () => {
    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.main}>
                <Outlet />
            </Box>
        </Box>
    );
};
