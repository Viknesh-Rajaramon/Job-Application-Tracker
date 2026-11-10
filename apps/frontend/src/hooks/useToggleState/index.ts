import { Dispatch, SetStateAction, useState } from "react";

const useToggleState = (
    initialState: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
    const [state, setState] = useState(initialState);

    const toggleState = () => {
        setState(!state);
    };

    return [state, toggleState, setState];
};

export default useToggleState;
