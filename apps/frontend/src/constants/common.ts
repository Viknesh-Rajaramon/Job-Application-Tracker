import { route } from "./routes";
import { SidebarMenu } from "../types/common";

export const sidebarMenu: SidebarMenu[] = [
    {
        name: "Dashboard",
        route: route.dashboard.path,
    },
    {
        name: "Applications",
        route: route.applications.path,
    },
    {
        name: "Sign Out",
    },
];
