import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/TitlesList/TitlesList";

export default async function Home() {
    return (
        <div>
            <SearchBar />
            <TitlesList />
        </div>
    )
}