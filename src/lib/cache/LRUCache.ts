import QuickLRU from "quick-lru";

export const LRUCache = new QuickLRU<string, {}>({
    maxSize: 5000,
});