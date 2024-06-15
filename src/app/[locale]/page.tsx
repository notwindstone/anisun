import SearchBar from "@/components/SearchBar/SearchBar";
import TitlesList from "@/components/Titles/TitlesList";
import Hero from "@/components/Hero/Hero";
import {Box, Container, rem, Stack} from "@mantine/core";

export default async function Home() {
    return (
        <div>
            <Hero />
            <Box
                pt={rem(32)}
                pl={0}
                pr={0}
                pb={rem(32)}
            >
                <Stack gap={rem(16)} p={0}>
                    <Container
                        w="100%"
                        pl={rem(32)}
                        pr={rem(32)}
                        pt={0}
                        pb={0}
                        size={1024}
                    >
                        <SearchBar position="bottom" size="xl" />
                    </Container>
                    <TitlesList />
                </Stack>
            </Box>
        </div>
    );
}