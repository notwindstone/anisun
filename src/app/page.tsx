import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import Hero from "@/components/Hero/Hero";
import {Container, rem, Stack} from "@mantine/core";

export default async function Home() {
    return (
        <div>
            <Hero />
            <Container
                size={1200}
                p={rem(32)}
            >
                <Stack gap={rem(16)} p={0}>
                    <SearchBar position="bottom" size="xl" />
                    <TitlesList />
                </Stack>
            </Container>
        </div>
    )
}