import { AnimesQueryParameters } from "@/constants/shikimori";

export const APIRoutes = {
    Root: "/api",
    OAuth2: {
        Root: "/oauth2",
        Pathname: "oauth2",
        Segment: "/oauth2/",
        Login: {
            Root: "/login",
            Pathname: "login",
            Segment: "/login/",
            Shikimori: {
                Root: "/shikimori",
                Pathname: "shikimori",
            },
        },
        Callback: {
            Root: "/callback",
            Pathname: "callback",
            Segment: "/callback/",
            Shikimori: {
                Root: "/shikimori",
                Pathname: "shikimori",
            },
        },
    },
};
export const OAuth2Routes = {
    Shikimori: {
        Login: APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Login.Root + APIRoutes.OAuth2.Login.Shikimori.Root,
        Callback: APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Callback.Root + APIRoutes.OAuth2.Callback.Shikimori.Root,
    },
};
export const PageRoutes = {
    Root: "/",
    Settings: {
        Root: "/settings",
        Pathname: "settings",
    },
    Profile: {
        Root: "/profile",
        Pathname: "profile",
        // Segment property is available only for deeply nested pages
        // For example, /profile/[username] has another nested page
        Segment: "/profile/",
        Params: {
            Username: "username",
        },
    },
    Anime: {
        Root: "/anime",
        Pathname: "anime",
        Segment: "/anime/",
        Params: {
            Series: "series",
        },
    },
    History: {
        Root: "/history",
        Pathname: "history",
    },
    Search: {
        Root: "/search",
        Pathname: "search",
        Segment: "/search/",
        // refer to https://shikimori.one/api/doc/graphql
        SearchParams: AnimesQueryParameters,
    },
    Account: {
        Root: "/account",
        Pathname: "account",
    },
};