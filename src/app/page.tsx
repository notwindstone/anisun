import SideBar from "@/components/SideBar/SideBar";
import {Button, Container} from "@mantine/core";
import Card from "@/components/Carousel/Card/Card";

export default async function Home() {


    return (
        <div>
            1234
            <Button>Кнопка вне контекста</Button>
            <SideBar />
            <Card />
        </div>
    )
}