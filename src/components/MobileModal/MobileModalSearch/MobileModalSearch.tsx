import {IconSearch} from "@tabler/icons-react";
import {Button, Drawer, Text} from "@mantine/core";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {useDisclosure} from "@mantine/hooks";

export default function MobileModalSearch() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                position="bottom"
                size="100%"
                opened={opened}
                onClose={close}
                className={classes.drawer}
            >
                MobileModalSearch
            </Drawer>
            <Button onClick={open} leftSection={<IconSearch/>}>
                <Text>Поиск</Text>
            </Button>
        </>
    )
}