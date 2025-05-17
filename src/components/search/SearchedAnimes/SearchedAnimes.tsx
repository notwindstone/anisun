import { SearchProvider } from "@/utils/providers/SearchProvider";
import SearchBar from "@/components/search/SearchBar/SearchBar";
import ClientFetchWrapper from "@/components/fetch/ClientFetchWrapper/ClientFetchWrapper";
import Cards from "@/components/misc/Cards/Cards";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <SearchBar />
                <ClientFetchWrapper isGrid>
                    <Cards isImageUnoptimized isGrid />
                </ClientFetchWrapper>
            </SearchProvider>
        </>
    );
}