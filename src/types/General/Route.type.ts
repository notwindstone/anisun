import { getNavbarItems } from "@/constants/navbar";

export type RouteType = ReturnType<typeof getNavbarItems>[0]["href"];
