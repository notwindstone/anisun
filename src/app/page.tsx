import SideBar from "@/components/SideBar/SideBar";
import {Button} from "@mantine/core";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";
import Comment from "@/components/Comments/Comment/Comment";

export default async function Home() {
    return (
        <div>
            1234
            <Button>Кнопка вне контекста</Button>
            <SideBar />
            <ConfiguredCarousel />
            <Comment />
        </div>
    )
}