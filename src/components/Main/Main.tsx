import React from "react";
import {Container, rem} from "@mantine/core";
import classes from './Main.module.css';

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <Container
            className={classes.root}
            size={rem(2160)}
        >
            {children}
        </Container>
    )
}