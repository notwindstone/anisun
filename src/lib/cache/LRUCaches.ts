"use server";

import QuickLRU from "quick-lru";
import { UserType } from "@/types/OAuth2/User.type";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { AnimeType } from "@/types/Anime/Anime.type";

const userLRUCache = new QuickLRU<string, UserType>({
    maxSize: 5000,
    maxAge: getRelativeDate({ days: 3 }).getMilliseconds(),
});
const animeLRUCache = new QuickLRU<string, AnimeType>({
    maxSize: 5000,
    maxAge: getRelativeDate({ days: 1 }).getMilliseconds(),
});

export const getUserLRUCache = async (): Promise<
    Omit<QuickLRU<string, UserType>, "set">
> => {
    return userLRUCache;
};
export const getAnimeLRUCache = async (): Promise<
    Omit<QuickLRU<string, AnimeType>, "set">
> => {
    return animeLRUCache;
};

export const setUserLRUCache = async ({
    key,
    user,
    options,
}: {
    key: string;
    user: UserType;
    options?: {
        maxAge?: number;
    };
}) => {
    userLRUCache.set(key, user, options);
};
export const setAnimeLRUCache = async ({
    key,
    anime,
    options,
}: {
    key: string;
    anime: AnimeType;
    options?: {
        maxAge?: number;
    };
}) => {
    animeLRUCache.set(key, anime, options);
};