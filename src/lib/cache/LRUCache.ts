import QuickLRU from "quick-lru";
import { UserType } from "@/types/OAuth2/User.type";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

export const LRUCache = new QuickLRU<string, UserType>({
    maxSize: 5000,
    maxAge: getRelativeDate({ days: 3 }).getMilliseconds(),
});