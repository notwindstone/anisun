import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
    return (
        <div>
            <Hero />
            <SearchBar position="bottom" />
            <TitlesList />
        </div>
    )
}