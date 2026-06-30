import { route } from "./routes";
import { SidebarMenu } from "../types/common";

export const sidebarMenu: SidebarMenu[] = [
    {
        name: "Dashboard",
        route: route.dashboard.path,
    },
    {
        name: "Add Application",
        route: route.addApplication.path,
    },
    {
        name: "View Applications",
        route: route.viewApplication.path,
    },
    {
        name: "Sign Out",
    },
];
