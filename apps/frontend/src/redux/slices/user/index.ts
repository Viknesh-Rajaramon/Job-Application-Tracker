import { createSlice } from "@reduxjs/toolkit";

type ApplicationData = {
    id: string;
    company: string;
    role: string;
    req_id: string;
    status: string;
    link: string;
};

interface IUser {
    isSignedIn: boolean;
    applicationStatusesColor: Record<string, string>;
    applicationData: ApplicationData[];
    applicationRowData: { id: "" };
};

const initialState: IUser = {
    isSignedIn: false,
    applicationStatusesColor: {},
    applicationData: [
        {
            id: "",
            company: "",
            role: "",
            req_id: "",
            status: "",
            link: "",
        }
    ],
    applicationRowData: { id: "" }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinUser: (state, action) => {
            state.isSignedIn = true;
            state.applicationStatusesColor = action.payload;
        },
        signoutUser: (state) => {
            state.isSignedIn = false;
            state.applicationStatusesColor = initialState.applicationStatusesColor;
        },
        setApplicationData: (state, action) => {
            state.applicationData = action.payload;
        },
        setApplicationRowData: (state, action) => {
            state.applicationRowData = action.payload;
        },
    },
});

export const {
    signinUser,
    signoutUser,
    setApplicationData,
    setApplicationRowData,
} = userSlice.actions;

export default userSlice.reducer;
