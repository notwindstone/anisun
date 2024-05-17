import SideBar from "@/components/SideBar/SideBar";
import {Button} from "@mantine/core";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";
import Comment from "@/components/Comments/Comment/Comment";
import SearchBar from "@/components/SearchBar/SearchBar";

export default async function Home() {
    return (
        <div>
            <SearchBar />
        </div>
    )
}