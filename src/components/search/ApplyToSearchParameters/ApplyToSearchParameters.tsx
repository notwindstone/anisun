"use client";

import { useSearchParams } from "next/navigation";
import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { useEffect } from "react";
import { AnyOption } from "@/constants/app";

const disallowed = ["page", "list", "username", "title", "selectedExtension"];

export default function ApplyToSearchParameters(): React.ReactNode {
    const data = useContextSelector(SearchContext, (value) => value.data);
    const searchParameters = useSearchParams();
    const searchParametersAsString = searchParameters.toString();

    useEffect(() => {
        const modifiedParameters = new URLSearchParams(searchParametersAsString);

        // when user comes from a page that had search params
        // this code executes and applies these search params
        // to the current route, which is a home page.
        // as for now, only the `/library` can have search params,
        // such as `page`, `list` and `username`.
        // let's just remove those params, because they are not being used in search.
        // this is a bad way to fix a problem tho, but whatever.
        // idc at this point, lol
        // fuck react, fuck re-renders
        // i'm switching to vue and svelte

        // update: there is also `title`, `selectedExtensions` params
        // that come from an anime page
        for (const itemToRemove of disallowed) {
            modifiedParameters.delete(itemToRemove);
        }

        const entries = Object.entries(data.filters);

        if (data.search !== "") {
            modifiedParameters.set("search", data.search);
        }

        if (data.search === "") {
            modifiedParameters.delete("search");
        }

        for (const [key, value] of entries) {
            if (["page", "list", "username", "search"].includes(key)) {
                continue;
            }

            let parsedValue: Array<string> | string | number | boolean = value;

            try {
                // value can be either a primitive or an array in the string representation
                if (typeof value === "string") {
                    parsedValue = JSON.parse(value);
                }
            } catch {
                // it's probably just a primitive then
                parsedValue = value;
            }

            const isFalsyValue = parsedValue === "" || parsedValue === false;
            const isEmptyArrayValue = Array.isArray(parsedValue) && parsedValue.length === 0;
            const isPlaceholderValue = parsedValue === AnyOption.value;

            if (isFalsyValue || isEmptyArrayValue || isPlaceholderValue) {
                modifiedParameters.delete(key);

                continue;
            }

            modifiedParameters.set(key, value.toString());
        }

        const modifiedSearchParametersAsString = modifiedParameters.toString();

        // don't apply the same search parameters
        if (searchParametersAsString === modifiedSearchParametersAsString) {
            return;
        }

        const areEmpty = modifiedSearchParametersAsString === "";

        // remove search parameters if modified parameters are empty
        if (areEmpty) {
            globalThis.history.replaceState({}, "", globalThis.location.pathname);

            return;
        }

        // apply search parameters
        globalThis.history.replaceState({}, "", `?${modifiedSearchParametersAsString}`);
    }, [data, searchParametersAsString]);

    return;
}
