import QuickLRU from "quick-lru";
import { AnimeType } from "@/types/Anime/Anime.type";
import { getTimeDifference } from "@/utils/misc/getTimeDifference";

export const AnimeLRUCache = new QuickLRU<string, AnimeType>({
    maxSize: 5000,
    maxAge: getTimeDifference({ days: 1 }),
});