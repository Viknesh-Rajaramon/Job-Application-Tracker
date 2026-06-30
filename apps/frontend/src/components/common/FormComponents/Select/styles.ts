import { SxProps } from "@mui/material";

const styles: { [key: string]: SxProps } = {
    container: {
        width: "100%",
    },

    label: {
        position: "static",
        display: "block",
        fontSize: "15px",
        marginBottom: "24px",
    },

    wrapper: {
        width: "100%",
        "& .MuiInput-underline:after": {},
        "& .MuiOutlinedInput-root": {
            height: "40px",
            border: "1px solid #7f7f7f",
            borderRadius: "4px",
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none",
            },
            "&.Mui-focused fieldset": {
                border: "none",
            },
        },
    },

    error: {
        marginTop: "6px",
    },
};

export default styles;
