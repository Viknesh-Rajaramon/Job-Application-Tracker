import { Styles } from "../../../types/common";

export const styles: Styles = {
    tableWrapper: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%"
    },
    
    heading: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "custom.text.secondary",
        paddingBottom: "20px",
    },

    topbar: {
        display: "flex",
    },

    searchBar: {
        width: "100%",
        marginBottom: "15px",
    },

    btnWrapper: {
        display: "flex",
        justifyContent: "end",
        alignSelf: "center",
        width: "100%",
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
        },
    },

    btn: {
        fontSize: "14px",
        minWidth: "150px",
        margin: "10px 0",
        height: "28px",
        backgroundColor: "primary.dark",
    },

    formBtnWrapper: {
        position: "relative",
    },

    tableLink: {
        color: "primary.main",
        cursor: "pointer",
        textDecoration: "underline",
        maxWidth: "130px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
};
