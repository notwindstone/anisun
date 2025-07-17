import { SearchProvider } from "@/utils/providers/SearchProvider";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar/AdvancedSearchBar";
import ClientFetchWithSearchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWithSearchWrapper";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
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
