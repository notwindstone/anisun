"use server";

import { UserType } from "@/types/OAuth2/User.type";
import { getUniversalUser } from "@/utils/oauth2/getUniversalUser";
import { OAuth2Routes } from "@/constants/routes";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";

export async function getUser({
    accessToken,
    fetchUser,
}: {
    accessToken: string;
    fetchUser: (accessToken: string) => Promise<Response>;
}): Promise<UserType | undefined> {
    const response = await fetchUser(accessToken);

    if (!response.ok) {
        return undefined;
    }

    let user: UserType;

    try {
        const data = await response.json();

        user = getUniversalUser({
            user: data,
        });
    } catch (error) {
        console.error("user.ts getUniversalUser error:", error);

        return undefined;
    }

    return user;
}
export async function validateUser({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}): Promise<"error" | "user" | "admin"> {
    let user;
    let fetchMethod = "GET";
    let fetchURL;
    let fetchHeaders = {};
    let fetchBody = {};

    switch (tokenProvider) {
        case "shikimori": {
            fetchURL = OAuth2Routes.Shikimori._FetchUser;

            break;
        }
        case "anilist": {
            fetchMethod = "POST";
            fetchURL = OAuth2Routes.Anilist._FetchUserURL;
            fetchHeaders = OAuth2Routes.Anilist._FetchUserHeaders;
            fetchBody = {
                body: OAuth2Routes.Anilist._FetchUserQuery,
            };

            break;
        }
        case "mal": {
            fetchURL = OAuth2Routes.MAL._FetchUser;

            break;
        }
    }

    try {
        const data = await fetch(fetchURL, {
            method:  fetchMethod,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...fetchHeaders,
            },
            next: {
                revalidate: 60 * 30, // 30 minutes cache
            },
            ...fetchBody,
        });

        user = await data.json();
    } catch (error: unknown) {
        console.log(error);

        return "error";
    }

    // my shikimori & anilist account ids
    if (user.id !== 1_452_707 && user.data.Viewer.id !== 7_302_037) {
        return "user";
    }

    return "admin";
}
