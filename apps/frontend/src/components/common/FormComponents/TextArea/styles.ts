import { Styles } from "../../../../types/common";

const styles: Styles = {
    wrapper: {
        "& .labelPos": {
            display: "flex",
            justifyContent: "start",
            alignItems: "start",

            "& .label": {
                paddingTop: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                minWidth: "110px",
                color: "custom.text.main",
                position: "static",
            },
        },

        "& .textarea": {
            borderRadius: "5px",
            fontFamily: "inherit",
            flexBasis: "100%",
            padding: "8px ",
            outline: "none",
            color: "custom.text.textGray",
        },
    },

    textarea: {
        padding: "12px",
        "& .MuiFormControl-root": {
            "&:before, :after, :focus:not(.Mui-disabled):before, ": {
                border: "none",
            },
        },
    },

    txtAreaAuto: {
        fontSize: "14px",
        padding: "8px",
    },

    error: {
        color: "error.main",
        padding: "0px",
        marginLeft: "110px",
    },

    counterStyles: {
        position: "absolute",
        bottom: "5px",
        right: "10px",
        fontSize: "12px",
        color: "grey",
    },
};

export default styles;
