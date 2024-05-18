import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
    return (
        <div>
            <Hero />
            <SearchBar />
            <TitlesList />
        </div>
    )
}