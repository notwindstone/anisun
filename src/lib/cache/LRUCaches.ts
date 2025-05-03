import QuickLRU from "quick-lru";
import { UserType } from "@/types/OAuth2/User.type";
import { AnimeType } from "@/types/Anime/Anime.type";
import { getTimeDifference } from "@/utils/misc/getTimeDifference";

export const UserLRUCache = new QuickLRU<string, UserType>({
    maxSize: 5000,
    maxAge: getTimeDifference({ days: 3 }),
});
export const AnimeLRUCache = new QuickLRU<string, AnimeType>({
    maxSize: 5000,
    maxAge: getTimeDifference({ days: 1 }),
});