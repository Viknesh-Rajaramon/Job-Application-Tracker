import { SxProps, Theme } from "@mui/material";

export const getTrimmedData = (obj) => {
    if (!obj || typeof obj !== "object") {
        return obj;
    }

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
            getTrimmedData(obj[key]);
        } else if (typeof obj[key] === "string") {
            obj[key] = obj[key].trim();
        }
    });

    return obj;
};

export const preventNumberInput = (e: {
    keyCode: any;
    preventDefault: () => void;
}) => {
    const charCode = e.keyCode;

    if (
        (charCode > 31 && charCode < 37) ||
        (charCode > 39 && charCode < 65) ||
        (charCode > 90 && charCode < 97) ||
        charCode > 122
    ) {
        e.preventDefault();
    }
};

export const mergeSx = (
    ...styles: Array<SxProps<Theme> | undefined>
): SxProps<Theme> => {
    return styles.flatMap((style) => {
        if (!style)
            return [];

        return Array.isArray(style) ? style : [style];
    });
};
