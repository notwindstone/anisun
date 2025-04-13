import { AnimesQueryParameters } from "@/constants/shikimori";

export const APIRoutes = {
    Root: "/api",
};
export const PageRoutes = {
    Root: "/",
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