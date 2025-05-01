"use server";

import { LRUCache } from "@/lib/cache/LRUCache";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { OAuth2Endpoints } from "@/constants/oauth2";
import { UserType } from "@/types/OAuth2/User.type";
import { getUniversalUser } from "@/utils/oauth2/getUniversalUser";

export async function getUser({
    accessToken,
    oauth2Provider,
}: {
    accessToken: string;
    oauth2Provider: OAuth2ProvidersType;
}): Promise<UserType | undefined> {
    const key = `${oauth2Provider}/${accessToken}`;
    const user = LRUCache.get(key);

    if (!user) {
        const endpoint = OAuth2Endpoints[oauth2Provider].User;
        const response = await fetch(endpoint);

        if (!response.ok) {
            return undefined;
        }

        const data = await response.json();
        const parsedUser = getUniversalUser({
            user: data,
        });

        LRUCache.set(key, parsedUser);

        return parsedUser;
    }

    return user;
}