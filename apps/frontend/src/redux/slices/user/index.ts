import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    isSignedIn: boolean;
    applicationStatusesColor: Record<string, string>;
};

const initialState: IUser = {
    isSignedIn: false,
    applicationStatusesColor: {},
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
    },
});

export const {
    signinUser,
    signoutUser,
} = userSlice.actions;

export default userSlice.reducer;
