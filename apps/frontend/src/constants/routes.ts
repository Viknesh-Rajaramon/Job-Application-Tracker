import { JSX } from "react/jsx-runtime";

import Dashboard from "../pages/dashboard";
import SignIn from "../pages/sign-in";
import Applications from "../pages/applications";

type Route = {
    [key: string]: {
        path: string;
        component: () => JSX.Element;
        isPublic?: boolean;
    };
};

export const route: Route = {
    dashboard: {
        path: "/",
        component: Dashboard,
    },
    signIn: {
        path: "/signin",
        component: SignIn,
    },
    applications: {
        path: "/applications",
        component: Applications,
    },
};

const routesData = {
    defaultRoutes: [
        route.dashboard,
        route.applications,
    ],
    authRoutes: [route.signIn],
};

export default routesData;
