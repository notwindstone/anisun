'use client'

import { useMediaQuery } from "@mantine/hooks";
import { em, Flex } from "@mantine/core";
import classes from './MobileModal.module.css';
import MobileModalMenu from "@/components/MobileModal/MobileModalMenu/MobileModalMenu";
import MobileModalSearch from "@/components/MobileModal/MobileModalSearch/MobileModalSearch";
import MobileModalProfile from "@/components/MobileModal/MobileModalProfile/MobileModalProfile";

export default function MobileModal() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return isMobile && (
        <div className={classes.wrapper}>
            <Flex
                className={classes.root}
                justify="space-between"
                align="center"
            >
                <MobileModalMenu />
                <MobileModalSearch />
                <MobileModalProfile />
            </Flex>
        </div>
    );
}