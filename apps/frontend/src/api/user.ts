import { UserSettings } from "../types/user";
import { adminInstance } from "./client";

export interface SigninRequest {
    email: string;
    password: string;
}

export const signIn = async (data: SigninRequest) => {
    return adminInstance.post("/users/signin", data);
};

export const signOut = async () => {
    return adminInstance.post("/users/signout");
};

export const updateUserSettings = async (data: UserSettings) => {
    return adminInstance.put("/users/settings", data);
};
