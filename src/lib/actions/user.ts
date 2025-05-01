"use server";

import { LRUCache } from "@/lib/cache/LRUCache";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";

export async function getUser({
    accessToken,
    oauth2Provider,
}: {
    accessToken: string;
    oauth2Provider: OAuth2ProvidersType;
}): Promise<{} | undefined> {
    const key = `${oauth2Provider}/${accessToken}`;
    const user = LRUCache.get(key);

    if (!user) {
        LRUCache.set(key, {});

        return undefined;
    }

    return user;
}