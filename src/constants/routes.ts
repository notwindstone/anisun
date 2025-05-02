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
            Anilist: {
                Root: "/anilist",
                Pathname: "anilist",
            },
            MAL: {
                Root: "/mal",
                Pathname: "mal",
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
            Anilist: {
                Root: "/anilist",
                Pathname: "anilist",
            },
            MAL: {
                Root: "/mal",
                Pathname: "mal",
            },
        },
    },
};
export const RemoteRoutes = {
    Shikimori: {
        V1: {
            Root: "https://shikimori.one/api",
            Users: {
                Root: "/users",
                Pathname: "users",
                Segment: "/users/",
                WhoAmI: {
                    Root: "/whoami",
                    Pathname: "whoami",
                },
            },
        },
        V2: {},
        GraphQL: {},
    },
};

const loginBase = APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Login.Root;
const callbackBase = APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Callback.Root;

export const OAuth2Routes = {
    Shikimori: {
        Login:      loginBase       + APIRoutes.OAuth2.Login.Shikimori.Root,
        Callback:   callbackBase    + APIRoutes.OAuth2.Callback.Shikimori.Root,
        _FetchUser: RemoteRoutes.Shikimori.V1.Root
            + RemoteRoutes.Shikimori.V1.Users.Root
            + RemoteRoutes.Shikimori.V1.Users.WhoAmI.Root,
    },
    Anilist: {
        Login:      loginBase       + APIRoutes.OAuth2.Login.Anilist.Root,
        Callback:   callbackBase    + APIRoutes.OAuth2.Callback.Anilist.Root,
    },
    MAL: {
        Login:      loginBase       + APIRoutes.OAuth2.Login.MAL.Root,
        Callback:   callbackBase    + APIRoutes.OAuth2.Callback.MAL.Root,
    },
    // lazyness to refactor peak
    __Endpoints: {
        shikimori: "https://shikimori.one/api/users/whoami",
        anilist: "https://graphql.anilist.co",
        mal: "https://api.myanimelist.net/v2/users/@me",
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
        Segment: "/account/",
        Params: {
            Error: "error",
        },
    },
};