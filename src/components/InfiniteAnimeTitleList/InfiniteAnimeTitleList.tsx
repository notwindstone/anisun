"use client"

import {Box, Text} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import AnimeTitleList from "@/components/AnimeTitle/AnimeTitleList/AnimeTitleList";

export default function InfiniteAnimeTitleList() {
    const { ref, inViewport } = useInViewport();

    return (
        <>
            <AnimeTitleList inViewport={inViewport} />
            <Box ref={ref} bg="violet" h={128} p={52}>
                <Text ta="center" c="white">Прокрутите ниже, чтобы загрузить контент</Text>
            </Box>
        </>
    )
}