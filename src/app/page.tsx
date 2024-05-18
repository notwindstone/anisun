import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";

export default async function Home() {
    return (
        <div>
            <ConfiguredCarousel />
            <SearchBar />
            <TitlesList />
        </div>
    )
}