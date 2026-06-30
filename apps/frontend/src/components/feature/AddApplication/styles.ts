import { Styles } from "../../../types/common";

export const styles: Styles = {
    heading: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "custom.text.secondary",
        paddingBottom: "20px",
    },

    form: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
        mt: 2,
    },

    input: {
        width: "100%",
    },
    
    fullWidth: {
        gridColumn: {
            xs: "1",
            md: "1 / -1",
        },
        width: "100%",
    },

    submitButton: {
        gridColumn: {
            xs: "1",
            md: "1 / -1",
        },
        width: {
            xs: "100%",
            md: "220px",
        },
        height: 48,
    },
};
