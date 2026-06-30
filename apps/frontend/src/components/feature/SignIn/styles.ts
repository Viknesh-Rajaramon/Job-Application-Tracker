import { Styles } from "../../../types/common";

export const styles: Styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 320,
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#ffffff"
    },
    
    heading: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "custom.text.secondary",
        paddingBottom: "20px",
    },

    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        flex: 1,
    },

    button: {
        padding: "10px 15px",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
            background: "#3730a3",
        },
        mt: 1,
    },
};
