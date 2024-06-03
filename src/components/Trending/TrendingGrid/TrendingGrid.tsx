import {AspectRatio, Grid, Skeleton} from "@mantine/core";
import TrendingCard from "@/components/Trending/TrendingCard/TrendingCard";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export default function TrendingGrid({
    data,
    isPending,
    placeholderData,
    gridColDesktop,
}: {
    data?: AnimeType[] | never[];
    isPending: boolean;
    placeholderData: unknown[];
    gridColDesktop?: number;
}) {
    return (
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            {
                (isPending && !data) ? (
                    placeholderData.map((_placeholder, index) => {
                        return (
                            <Grid.Col key={index} span={{ base: 12, xs: 6, md: gridColDesktop }}>
                                <AspectRatio ratio={ 3 / 4 }>
                                    <Skeleton radius="md" w="100%" h="100%" />
                                </AspectRatio>
                            </Grid.Col>
                        );
                    })
                ) : data && (
                    data.map((anime) => {
                        return (
                            <Grid.Col key={anime.id} span={{ base: 12, xs: 6, md: gridColDesktop }}>
                                <TrendingCard anime={anime} />
                            </Grid.Col>
                        );
                    })
                )
            }
        </Grid>
    );
}