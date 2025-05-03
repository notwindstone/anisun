import { SearchProvider } from "@/utils/providers/SearchProvider";
import Search from "@/components/Search/Search";

export default function SearchedAnimes() {
    return (
        <>
            <SearchProvider>
                <Search />
            </SearchProvider>
        </>
    );
}