import { SearchProvider } from "@/utils/providers/SearchProvider";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar/AdvancedSearchBar";
import ClientFetchWithSearchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWithSearchWrapper";

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
            </SearchProvider>
        </>
    );
}
