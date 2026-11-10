import { createAction } from "@reduxjs/toolkit";

interface ISignout {
  isSignedIn: boolean;
}

export const signoutAction = createAction<ISignout>("signoutUserAction");
