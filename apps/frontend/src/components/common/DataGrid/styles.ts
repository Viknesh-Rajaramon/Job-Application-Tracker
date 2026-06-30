import { Styles } from "../../../types/common";

export const styles: Styles = {
    dataGridWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",

        "& .MuiDataGrid-root": {
            fontSize: "14px",
            border: "none",
            "& .MuiDataGrid-columnHeader,.MuiDataGrid-root .MuiDataGrid-cell": {
                outline: "none !important",
            },
        },

        "&.MuiDataGrid-footerContainer": {
            justifyContent: "center !important",
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
                position: "relative",
                "&:nth-of-type(2n)": {
                    border: "none",
                    backgroundColor: "custom.background.gray",
                },
            },
        },

        "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "14px",
            fontWeight: "bold",
            color: "custom.text.secondary",
        },

        "& .MuiDataGrid-columnHeaders": {
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "primary.dark",
            backgroundColor: "white",
        },

        "& .MuiDataGrid-main": {
            overflowY: "auto",
            "& .MuiDataGrid-footerContainer": {
                justifyContent: "center !important",
            },
        },

        "&.MuiDataGrid-main": {
            backgroundColor: "green !important",
        },

        "& .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
            "&:focus,&:focus-within": {
                outline: "none !important",
            },
        },
        "&.MuiDataGrid-row": { borderBottom: "none" },
        "& .MuiDataGrid-columnsContainer": {
            border: "none !important",
        },

        "&.MuiToolbar-root": {
            marginTop: "20px",
        },

        "& .MuiDataGrid-iconButtonContainer": {
            visibility: "visible",
            width: "auto",
            marginLeft: "-8px",
            marginTop: "3px",
        },
        "&	.MuiDataGrid-columnHeader--sortable": {
            "& .MuiDataGrid-columnHeaderTitle": {
                marginLeft: "20px",
            },
        },
    },

    grid: {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "primary.dark",
        backgroundColor: "white",
    },
    noRows: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        display: "flex",
        position: "absolute",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.38)",
        fontWeight: 500,
        fontSize: "20px",
        color: "custom.text.darkGray",
    },

    paginationWrapper: {
        margin: "10px auto",
        "& ul": {
            justifyContent: "center !important",
        },
    },

    pagination: {
        marginTop: "10px",
        paddingTop: "10px",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "primary.dark",
        backgroundColor: "white",
    },

    paginationItem: {
        "&.Mui-selected": {
            color: "primary.dark",
            backgroundColor: "white",
            fontSize: "14px",
            fontWeight: "600",
            "&:hover": {
                backgroundColor: "white",
            },
        },
    },

    iconStyles: {
        color: "custom.misc.joyBlue",
    },
};
