import {Container, Flex, rem, Skeleton, Stack} from "@mantine/core";
import classes from "./page.module.css";
import React from "react";

export default function Loading() {
    return (
        <Container className={classes.container} size={1200}>
            <Flex wrap="nowrap" gap={rem(16)}>
                <Skeleton h={112} w={112} circle />
                <Stack gap={4}>
                    <Skeleton w={256} h={36} radius="xl" />
                    <Skeleton w={256} h={20} radius="xl" />
                    <Skeleton w={256} h={20} radius="xl" />
                    <Skeleton w={256} h={20} radius="xl" />
                </Stack>
            </Flex>
        </Container>
    );
}