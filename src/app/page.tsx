import SideBar from "@/components/SideBar/SideBar";
import {Button} from "@mantine/core";

export default async function Home() {
    return (
        <div>
            1234
            <Button>Кнопка вне контекста</Button>
            <SideBar />
        </div>
    )
}