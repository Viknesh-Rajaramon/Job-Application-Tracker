import { Styles } from "../../../../types/common";

const styles: Styles = {
    wrapper: {
        fontSize: {
            xs: "13.6px",
            sm: "16px",
        },
        fontWeight: "bold",
        width: "248px",
        height: "40px",
        boxShadow: "none",
        backgroundColor: "primary.dark",
        "&:hover": {
            backgroundColor: "primary.dark",
        },

        "&.Mui-disabled": {
            backgroundColor: "primary.light",
            color: "white",
        },
        "&.MuiButton-sizeSmall": {
            height: "28px",
            fontSize: "13.6px",
        }
    },
    icon: {
        marginRight: "4px",
    },

    btnStyles: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        whiteSpace: "nowrap",
    },
};

export default styles;
