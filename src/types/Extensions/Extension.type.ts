export type ManifestType = {
    // should be unique
    "id"       : string;
    "logo"     : string;
    "name"     : string;
    "url"      : string;
    "version"  : string;
    "authors"  : Array<string>;
    // use ISO 639-1 two-letter language codes
    "languages": Array<string>;

    /*
     * mal - uses MAL ID to get media (e.g. Anilibria API, Kodik)
     * non-mal - uses different method to get media (e.g. Consumet API)
     * cosmetic - changes app UI
     * advanced - extends app functionality (e.g. shows comments from anilist/shikimori, parses dub ratings from animestars)
     */
    "categories": Array<"mal" | "non-mal" | "cosmetic" | "advanced">;
} & Partial<{
    "description": string;
    // a list of routes that extension will use for its own pages
    "pages"      : Array<string>;
    // only works for local storage entries
    "enabled"    : boolean;
}>;
