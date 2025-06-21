import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { UserType } from "@/types/OAuth2/User.type";

export const CookieConfigKey = "configs";
export const DarkThemeKey = "dark";
export const LightThemeKey = "light";
export const SidebarLeftPosition = "left";
export const SidebarRightPosition = "right";
export const InitialConfig: SafeConfigType = {
    theme:  DarkThemeKey,
    colors: {
        accent: "rose",
        base:   "neutral",
    },
    layout: {
        sidebar: {
            expanded: false,
            position: SidebarLeftPosition,
        },
    },
    library: {
        libraryEntriesOnThePage: 18,
        historyEntriesOnThePage: 48,
    },
};
export const PlaceholderAccount: UserType = {
    username: "",
    avatar:   "",
};
