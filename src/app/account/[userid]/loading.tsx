import {Container, Flex, rem, Skeleton, Stack} from "@mantine/core";
import classes from "@/app/account/[userid]/page.module.css";
import React from "react";

export default function Loading() {
    return (
        <Container className={classes.container} size={1200}>
            <Flex gap={rem(16)}>
                <Skeleton h={112} w={112} circle />
            </Flex>
            <Stack gap={4}>
                <Skeleton width={256} height={36} radius="xl" />
                <Skeleton width={256} height={18} radius="xl" />
                <Stack gap={rem(4)}>
                    <Skeleton width={256} height={24} />
                    <Skeleton width={256} height={24} />
                </Stack>
            </Stack>
        </Container>
    );
}