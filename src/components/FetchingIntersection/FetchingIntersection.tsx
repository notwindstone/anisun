"use client"

import {Box, Text} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import {useEffect} from "react";

export default function FetchingIntersection() {
    const { ref, inViewport } = useInViewport();

    useEffect(() => {
        if (!inViewport) {
            console.log('not fetching')
            return
        }

        console.log("fetching")

        //fetchNextPage().then()
    }, [inViewport]);

    return (
        <Box ref={ref} bg="violet" h={32} p={4}>
            <Text ta="center" c="white">Прокрутите ниже, чтобы загрузить контент</Text>
        </Box>
    )
}