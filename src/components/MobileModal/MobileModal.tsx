'use client'

import {useHeadroom, useMediaQuery} from "@mantine/hooks";
import {em, Flex, rem} from "@mantine/core";
import classes from './MobileModal.module.css';
import MobileModalMenu from "@/components/MobileModal/MobileModalMenu/MobileModalMenu";
import MobileModalSearch from "@/components/MobileModal/MobileModalSearch/MobileModalSearch";
import MobileModalProfile from "@/components/MobileModal/MobileModalProfile/MobileModalProfile";

export default function MobileModal() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const pinned = useHeadroom({ fixedAt: 120 })

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
                <MobileModalMenu />
                <MobileModalSearch />
                <MobileModalProfile />
            </Flex>
        </div>
    );
}