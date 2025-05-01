import QuickLRU from "quick-lru";
import { UserType } from "@/types/OAuth2/User.type";

export const LRUCache = new QuickLRU<string, UserType>({
    maxSize: 5000,
});