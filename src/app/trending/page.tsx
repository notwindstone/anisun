import {Metadata} from "next";
import Trending from "@/components/Trending/Trending";
import classes from './page.module.css';
import {Container} from "@mantine/core";

export const metadata: Metadata = {
    title: 'Популярное - Animeth',
    description: 'Страница с популярными тайтлами',
};

export default function Page() {
    return (
        <Container className={classes.container} size={1200}>
            <Trending />
        </Container>
    );
}