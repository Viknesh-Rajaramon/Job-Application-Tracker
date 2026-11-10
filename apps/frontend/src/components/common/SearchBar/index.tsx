import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Input from "../FormComponents/Input";
import { debounce } from "../../../utils/debouncing";

import styles from "./styles";

type FormInputs = {
    search: string;
};

type SearchProps = {
    getText: (txt: string) => void;
    placeholder?: string;
};

const SearchBar = ({ getText, placeholder = "Search" }: SearchProps) => {
    const {
        control,
        watch,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "onChange",
        defaultValues: {
            search: "",
        },
    });

    const search = watch("search");
    const debouncedSearch = useMemo(
        () => debounce((value: string) => { getText(value) }, 700),
        [getText],
    );

    useEffect(() => {
        if (search.length === 0 || search.length >= 2)
            debouncedSearch(search);
    }, [search, debouncedSearch]);

    return (
        <Input
            control={control}
            label="Search"
            name="search"
            showAdornment
            adornmentPos="start"
            className="search"
            errors={errors}
            customStyle={{ inputField: styles.searchBar }}
            rules={{}}
            placeholder={placeholder}
        />
    );
};

export default SearchBar;
