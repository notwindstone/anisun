import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import Hero from "@/components/Hero/Hero";
import {Box, Container, rem, Stack} from "@mantine/core";

export default async function Home() {
    return (
        <div>
            <Hero />
            <Container
                pt={rem(32)}
                pl={0}
                pr={0}
                pb={rem(32)}
                size={1200}
            >
                <Stack gap={rem(16)} p={0}>
                    <Box pl={rem(32)} pr={rem(32)}>
                        <SearchBar position="bottom" size="xl" />
                    </Box>
                    <TitlesList />
                </Stack>
            </Container>
        </div>
    );
}