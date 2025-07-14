import { AnimesQueryParameters } from "@/constants/shikimori";
import { AnilistIcon, MALIcon, ShikimoriIcon } from "@/constants/icons";

export const APIRoutes = {
    Root:   "/api",
    OAuth2: {
        Root:     "/oauth2",
        Pathname: "oauth2",
        Segment:  "/oauth2/",
        Login:    {
            Root:      "/login",
            Pathname:  "login",
            Segment:   "/login/",
            Shikimori: {
                Root:     "/shikimori",
                Pathname: "shikimori",
            },
            Anilist: {
                Root:     "/anilist",
                Pathname: "anilist",
            },
            MAL: {
                Root:     "/mal",
                Pathname: "mal",
            },
        },
        Callback: {
            Root:      "/callback",
            Pathname:  "callback",
            Segment:   "/callback/",
            Shikimori: {
                Root:     "/shikimori",
                Pathname: "shikimori",
            },
            Anilist: {
                Root:     "/anilist",
                Pathname: "anilist",
            },
            MAL: {
                Root:     "/mal",
                Pathname: "mal",
            },
        },
    },
};
export const RemoteRoutes = {
    Shikimori: {
        V1: {
            Root:  "https://shikimori.one/api",
            Users: {
                Root:     "/users",
                Pathname: "users",
                Segment:  "/users/",
                WhoAmI:   {
                    Root:     "/whoami",
                    Pathname: "whoami",
                },
            },
        },
        V2:      {},
        GraphQL: {},
    },
    Anilist: {
        GraphQL: {
            Root: "https://graphql.anilist.co",
        },
    },
    MAL: {
        V2: {
            Root:  "https://api.myanimelist.net/v2",
            Users: {
                Root:     "/users",
                Pathname: "users",
                Segment:  "/users/",
                Me:       {
                    Root:     "/@me",
                    Pathname: "@me",
                },
            },
        },
    },
};

const loginBase = APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Login.Root;
const callbackBase = APIRoutes.Root + APIRoutes.OAuth2.Root + APIRoutes.OAuth2.Callback.Root;

export const OAuth2Routes = {
    Anilist: {
        Login:             loginBase       + APIRoutes.OAuth2.Login.Anilist.Root,
        Callback:          callbackBase    + APIRoutes.OAuth2.Callback.Anilist.Root,
        _FetchUserURL:     RemoteRoutes.Anilist.GraphQL.Root,
        _FetchUserQuery:   JSON.stringify({ query: `query { Viewer { id name } }` }),
        _FetchUserHeaders: {
            "Content-Type": "application/json",
            Accept:         "application/json",
        },
        __Icon: AnilistIcon,
        __Name: "AniList",
    },
    Shikimori: {
        Login:      loginBase       + APIRoutes.OAuth2.Login.Shikimori.Root,
        Callback:   callbackBase    + APIRoutes.OAuth2.Callback.Shikimori.Root,
        _FetchUser: RemoteRoutes.Shikimori.V1.Root
            + RemoteRoutes.Shikimori.V1.Users.Root
            + RemoteRoutes.Shikimori.V1.Users.WhoAmI.Root,
        __Icon: ShikimoriIcon,
        __Name: "Shikimori",
    },
    MAL: {
        Login:      loginBase       + APIRoutes.OAuth2.Login.MAL.Root,
        Callback:   callbackBase    + APIRoutes.OAuth2.Callback.MAL.Root,
        _FetchUser: RemoteRoutes.MAL.V2.Root
            + RemoteRoutes.MAL.V2.Users.Root
            + RemoteRoutes.MAL.V2.Users.Me.Root,
        __Icon: MALIcon,
        __Name: "MyAnimeList",
    },
};
export const PageRoutes = {
    Home: {
        Root:     "/",
        Pathname: "",
    },
    Anime: {
        Root:     "/anime",
        Pathname: "anime",
        Segment:  "/anime/",
        Params:   {
            Series: "series",
        },
    },
    Extensions: {
        Root:     "/extensions",
        Pathname: "extensions",
    },
    Library: {
        Root:         "/library",
        Pathname:     "library",
        Segment:      "/library/",
        // refer to https://shikimori.one/api/doc/graphql
        SearchParams: AnimesQueryParameters,
    },
    Account: {
        Root:     "/account",
        Pathname: "account",
        Segment:  "/account/",
        Params:   {
            Error: "error",
        },
    },
} as const;
