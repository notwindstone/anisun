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
    MALToAnilibriaID: {
        Data: "https://raw.githubusercontent.com/qt-kaneko/MALibria/db/mapped.json",
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
        __Icon: ShikimoriIcon,
        __Name: "Shikimori",
    },
    Anilist: {
        Login:    loginBase       + APIRoutes.OAuth2.Login.Anilist.Root,
        Callback: callbackBase    + APIRoutes.OAuth2.Callback.Anilist.Root,
        __Icon:   AnilistIcon,
        __Name:   "AniList",
    },
    MAL: {
        Login:    loginBase       + APIRoutes.OAuth2.Login.MAL.Root,
        Callback: callbackBase    + APIRoutes.OAuth2.Callback.MAL.Root,
        __Icon:   MALIcon,
        __Name:   "MyAnimeList",
    },
};
export const PageRoutes = {
    Root:    "/",
    Profile: {
        Root:     "/profile",
        Pathname: "profile",
        // Segment property is available only for deeply nested pages
        // For example, /profile/[username] has another nested page
        Segment:  "/profile/",
        Params:   {
            Username: "username",
        },
    },
    Anime: {
        Root:     "/anime",
        Pathname: "anime",
        Segment:  "/anime/",
        Params:   {
            Series: "series",
        },
    },
    History: {
        Root:     "/history",
        Pathname: "history",
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
};