import { SearchProvider } from "@/utils/providers/SearchProvider";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar/AdvancedSearchBar";
import ClientFetchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWrapper";
import Cards from "@/components/layout/Cards/Cards";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <AdvancedSearchBar />
                <div className="max-w-384 w-full mx-auto">
                    <ClientFetchWrapper isGrid>
                        <Cards isImageUnoptimized isGrid />
                    </ClientFetchWrapper>
                </div>
            </SearchProvider>
        </>
    );
}
