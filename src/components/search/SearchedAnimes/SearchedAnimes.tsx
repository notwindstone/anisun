import { SearchProvider } from "@/lib/providers/SearchProvider";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar/AdvancedSearchBar";
import ClientFetchWithSearchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWithSearchWrapper";
import ApplyToSearchParameters from "@/components/search/ApplyToSearchParameters/ApplyToSearchParameters";

export default function SearchedAnimes({
    mediaGenres,
    mediaTags,
}: {
    mediaGenres?: Array<string>;
    mediaTags?:   Array<Partial<{
        name:        string;
        category:    string;
        description: string;
    }>>;
}) {
    const categorizedTags: Record<string, Array<{
        name:        string;
        description: string;
    }>> = {};

    // 0.12870000302791595 ms to do all this work on ryzen 3 3100
    // no need to cache or use maps here i guess
    for (const tag of (mediaTags ?? [])) {
        const safeCategory = tag?.category ?? "default";

        if (categorizedTags[safeCategory] === undefined) {
            categorizedTags[safeCategory] = [];
        }

        categorizedTags[safeCategory].push({
            name:        tag?.name ?? "",
            description: tag?.description ?? "",
        });
    }

    return (
        <>
            <SearchProvider
                mediaGenres={mediaGenres}
                mediaTags={categorizedTags}
            >
                <AdvancedSearchBar />
                <div className="max-w-384 w-full mx-auto">
                    <ClientFetchWithSearchWrapper
                        isGrid
                    />
                </div>
                <ApplyToSearchParameters />
            </SearchProvider>
        </>
    );
}
