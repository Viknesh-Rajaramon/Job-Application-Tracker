import { Styles } from "../../../../types/common";

const styles: Styles = {
    heading: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "custom.text.secondary",
        paddingBottom: "20px",
    },

    backWrapper: {
        position: "absolute",
        marginTop: "10px",
        marginLeft: "45px",
    },

    backStyles: {
        display: "flex",
        alignItems: "center",
        fontSize: "15px",
        cursor: "pointer",
        color: "custom.background.dropdownCta",
        top: "10px",
        left: "10px",
        "&:after": {
            top: "20px",
            content: '""',
            display: "block",
            margin: "auto",
            height: "1.5px",
            width: "100%",
            background: "#056EE6",
            position: "absolute",
        },
        "& .MuiSvgIcon-root": {
            fontSize: "12px",
            marginRight: "0",
        },
    },

    backArrow: {
        marginRight: "10px",
        cursor: "pointer",
    },

    submitWrapper: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "end",
    },

    submitBtn: {
        fontSize: "14px",
        margin: "10px 0",
        height: "28px",
        backgroundColor: "primary.dark",
        "&:disabled": {
            backgroundColor: "primary.light",
            color: "white",
        },
        minWidth: "180px",
    },

    formWrapper: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
        mt: 2,
    },

    input: {
        marginBottom: "25px",
    },
};

export default styles;
