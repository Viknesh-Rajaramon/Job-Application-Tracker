import {
    FieldError,
    FieldErrors,
    FieldValues,
    Path
} from "react-hook-form";

export const formatDate = (date: string | undefined) => {
    if (!date)
        return;

    const localDate = new Date(date);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const day = localDate.getUTCDate();
    const month = localDate.getUTCMonth();
    const year = localDate.getUTCFullYear();

    return `${day} ${months[month]} ${year}`;
};

export const getError = <T extends FieldValues>(
    name: Path<T>,
    errors: FieldErrors
): FieldError | undefined => {
    if (!Object.keys(errors).length)
        return undefined;

    const path = name
        .split(".")
        .map((item) => item.replaceAll("[", "").replaceAll("]", ""));

    const error = path.reduce<unknown>((current, key) => {
        return current && typeof current === "object" && key in current
            ? (current as Record<string, unknown>)[key]
            : undefined;
    }, errors);
    
    return error && typeof error === "object" && "message" in error && "type" in error
        ? (error as unknown as FieldError)
        : undefined;
};
