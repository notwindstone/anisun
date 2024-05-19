import {Burger} from "@mantine/core";
import {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";

export default function SideBarBurger() {
    const { opened, toggle } = useContext(
        SideBarContext
    );
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        <Burger
            opened={opened}
            onClick={toggle}
            title={title}
        />
    );
}