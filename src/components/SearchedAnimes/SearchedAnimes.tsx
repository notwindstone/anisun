import { SearchProvider } from "@/utils/providers/SearchProvider";
import Search from "@/components/Search/Search";
import ClientFetchWrapper from "@/components/ClientFetch/ClientFetchWrapper/ClientFetchWrapper";
import Cards from "@/components/Cards/Cards";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <Search />
                <ClientFetchWrapper>
                    <Cards />
                </ClientFetchWrapper>
            </SearchProvider>
        </>
    );
}