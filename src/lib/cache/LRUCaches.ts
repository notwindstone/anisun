import QuickLRU from "quick-lru";
import { AnimeType } from "@/types/Anime/Anime.type";
import { getTimeDifference } from "@/utils/misc/getTimeDifference";

// in-memory cache doesn't work in api routes tho
// refer to https://github.com/vercel/next.js/discussions/59509 (no i'm not implementing that)
export const AnimeLRUCache = new QuickLRU<
    string,
    Record<
        string,
        AnimeType | Record<"media", Array<AnimeType>>
    >
>({
    maxSize: 5000,
    maxAge:  getTimeDifference({ days: 1 }),
});
export const MiscLRUCache = new QuickLRU<string, number>({
    maxSize: 50,
    maxAge:  getTimeDifference({ minutes: 3 }),
});
export const UsersOnlineCountLRUCache = new QuickLRU<string, string>({
    maxSize: 5000,
    maxAge:  getTimeDifference({ minutes: 1 }),
});
