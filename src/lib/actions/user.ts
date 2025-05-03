"use server";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { UserType } from "@/types/OAuth2/User.type";
import { getUniversalUser } from "@/utils/oauth2/getUniversalUser";
import { UserLRUCache } from "@/lib/cache/LRUCaches";

export async function getUser({
    accessToken,
    oauth2Provider,
    fetchUser,
}: {
    accessToken: string;
    oauth2Provider: OAuth2ProvidersType;
    fetchUser: (accessToken: string) => Promise<Response>;
}): Promise<UserType | undefined> {
    const key = `${oauth2Provider}/${accessToken}`;
    const user = UserLRUCache.get(key);

    if (!user) {
        const response = await fetchUser(accessToken);

        if (!response.ok) {
            return undefined;
        }

        let fetchedUser: UserType;

        try {
            const data = await response.json();

            fetchedUser = getUniversalUser({
                user: data,
            });
        } catch {
            return undefined;
        }

        UserLRUCache.set(key, fetchedUser);

        return fetchedUser;
    }

    return user;
}