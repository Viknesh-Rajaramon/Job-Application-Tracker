import { Styles } from "../../../types/common";

const styles: Styles = {
    paperStyles: {
        top: "46px !important",
        left: "calc(100% - 166px)!important",
    },

    title: {
        width: "152px",
        height: "28px",
        padding: "6px 8px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        justifyContent: "space-between",
        cursor: "pointer",
        color: "custom.text.white",
        backgroundColor: "custom.background.dropdownCta",
    },

    icon: {
        cursor: "pointer",
    },

    dropdown: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "12px",
        "&.MuiBox-root": {
            width: "152px",
        },
    },

    dropdownItems: {
        width: "80%",
        margin: "10px 5px",
        cursor: "pointer",
        fontSize: "14px",
    },

    divider: {
        width: "90%",
        border: "1px solid #D6D6D6",
    },
};

export default styles;
