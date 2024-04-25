'use client'

import {useMediaQuery} from "@mantine/hooks";
import {em} from "@mantine/core";

export default function MobileModal() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return (
        <>
            {
                isMobile && (
                    <div>mobile modal</div>
                )
            }
        </>
    );
}