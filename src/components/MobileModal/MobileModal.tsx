'use client'

import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {em} from "@mantine/core";

export default function MobileModal() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const [isOpen, { toggle }] = useDisclosure(false);

    return (
        <>
            {
                isMobile && (
                    <div>12341234</div>
                )
            }
        </>
    );
}