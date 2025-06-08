import { SearchProvider } from "@/utils/providers/SearchProvider";
import SearchBar from "@/components/search/SearchBar/SearchBar";
import ClientFetchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWrapper";
import Cards from "@/components/misc/Cards/Cards";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <SearchBar />
                <div className="max-w-384 w-full mx-auto">
                    <ClientFetchWrapper isGrid>
                        <Cards isImageUnoptimized isGrid />
                    </ClientFetchWrapper>
                </div>
            </SearchProvider>
        </>
    );
}
