'use client';

import {useHeadroom} from "@mantine/hooks";
import {Flex, rem} from "@mantine/core";
import classes from './MobileNavbar.module.css';
import MobileModalNavigation from "@/components/MobileNavbar/MobileNavbarNavigation/MobileNavbarNavigation";
import MobileNavbarSearch from "@/components/MobileNavbar/MobileNavbarSearch/MobileNavbarSearch";
import MobileModalMenu from "@/components/MobileNavbar/MobileNavbarMenu/MobileNavbarMenu";
import useMobileScreen from "@/hooks/useMobileScreen";

export default function MobileNavbar() {
    const { isMobile } = useMobileScreen();
    const pinned = useHeadroom({ fixedAt: 120 });

    return isMobile && (
        <div
            className={classes.wrapper}
            style={{ transform: `translate3d(0, ${pinned ? 0 : rem(128)}, 0)` }}
        >
            <Flex
                className={classes.root}
                justify="space-between"
                align="center"
            >
                <MobileModalNavigation />
                <MobileNavbarSearch />
                <MobileModalMenu />
            </Flex>
        </div>
    );
}