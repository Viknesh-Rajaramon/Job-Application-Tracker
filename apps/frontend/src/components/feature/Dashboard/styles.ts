import { Styles } from "../../../types/common";

export const styles: Styles = {
    heading: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "custom.text.secondary",
        paddingBottom: "20px",
    },

    summary: {
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
    },

    card: {
        flex: 1,
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        fontWeight: "bold",
    },

    chartsContainer: {
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginTop: "20px",
    },

    pieChartWrapper: {
        flex: "0 0 400px",
    },

    lineChartWrapper: {
        flex: 1,
    },

    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
    },
};
