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
    return (
        <>
            <SearchProvider
                mediaGenres={mediaGenres}
                mediaTags={mediaTags}
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
