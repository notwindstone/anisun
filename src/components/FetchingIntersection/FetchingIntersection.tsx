"use client"

import {Box, Text} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import AnimeTitleList from "@/components/AnimeTitle/AnimeTitleList/AnimeTitleList";

export default function FetchingIntersection() {
    const { ref, inViewport } = useInViewport();

    return (
        <>
            <AnimeTitleList inViewport={inViewport} />
            <Box ref={ref} bg="violet" h={32} p={4}>
                <Text ta="center" c="white">Прокрутите ниже, чтобы загрузить контент</Text>
            </Box>
        </>
    )
}