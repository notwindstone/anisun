"use client"

import {Center, Text} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import AnimeTitleList from "@/components/AnimeTitle/AnimeTitleList/AnimeTitleList";

export default function InfiniteAnimeTitleList() {
    const { ref, inViewport } = useInViewport();

    return (
        <>
            <AnimeTitleList inViewport={inViewport} />
            <Center ref={ref} bg="black" h={256}>
                <Text c="white">Прокрутите ниже, чтобы загрузить контент</Text>
            </Center>
        </>
    )
}