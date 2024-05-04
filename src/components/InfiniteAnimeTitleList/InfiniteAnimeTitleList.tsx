"use client"

import {Center, Text} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import AnimeTitleList from "@/components/AnimeTitle/AnimeTitleList/AnimeTitleList";

export default function InfiniteAnimeTitleList() {

    return (
        <>
            <AnimeTitleList inViewport={true} />
            <Center  bg="black" h={256}>
                <Text c="white">Прокрутите ниже, чтобы загрузить контент</Text>
            </Center>
        </>
    )
}