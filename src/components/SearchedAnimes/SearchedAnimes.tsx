import { SearchProvider } from "@/utils/providers/SearchProvider";
import Search from "@/components/Search/Search";
import ClientFetchWrapper from "@/components/ClientFetch/ClientFetchWrapper/ClientFetchWrapper";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <Search />
                <ClientFetchWrapper />
            </SearchProvider>
        </>
    );
}