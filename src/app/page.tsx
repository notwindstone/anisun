import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import Hero from "@/components/Hero/Hero";
import ColorSchemePicker from "@/components/ColorSchemePicker/ColorSchemePicker";

export default async function Home() {
    return (
        <div>
            <ColorSchemePicker />
            <Hero />
            <SearchBar />
            <TitlesList />
        </div>
    )
}