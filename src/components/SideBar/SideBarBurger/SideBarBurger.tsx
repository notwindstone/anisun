import {Box, Burger, rem} from "@mantine/core";
import {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import classes from './SideBarBurger.module.css';

export default function SideBarBurger() {
    const { opened, toggle } = useContext(
        SideBarContext
    );
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        // Burger's size is 34x34, so Box has padding of 15px and not 16px
        <Box p={rem(15)}>
            <Burger
                opened={opened}
                onClick={toggle}
                title={title}
            />
        </Box>
    );
}