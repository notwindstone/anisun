import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import useCustomTheme from "@/hooks/useCustomTheme";
import {variables} from "@/configs/variables";
import {Badge, Flex, Image, Overlay, Paper, Title} from "@mantine/core";
import Link from "next/link";
import classes from "./CarouselMobileCard.module.css";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import NextImage from "next/image";

export default function CarouselMobileCard({
    animeTitle,
}: {
    animeTitle?: AnimeType;
}) {
    const { theme } = useCustomTheme();
    const animeStatus = animeTitle?.status ?? "";
    const isAnnounced = animeStatus === 'anons';

    return (
        <Paper
            component={Link}
            href={`/titles/${animeTitle?.url.replace('https://shikimori.one/animes/', '')}`}
            radius="xl"
            className={classes.card}
        >
            <Overlay
                radius="xl"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                className={classes.overlay}
            >
                <Badge className={classes.status} color="black">
                    {translateAnimeStatus({ sortingType: animeStatus, singular: true })}
                </Badge>
                {
                    !isAnnounced && (
                        <Badge
                            autoContrast
                            className={classes.score}
                            color={theme.color}
                        >
                            {animeTitle?.score}
                        </Badge>
                    )
                }
                <Flex
                    className={classes.info}
                    direction="column"
                    justify="flex-end"
                    gap="0.25rem"
                >
                    {
                        !isAnnounced && (
                            <Badge autoContrast className={classes.episodes} color={theme.color}>
                                {animeTitle?.episodesAired} / {animeTitle?.episodes}
                            </Badge>
                        )
                    }
                    <Title
                        className={classes.title}
                        order={3}
                        lineClamp={isAnnounced ? 3 : 2}
                    >
                        {animeTitle?.russian}
                    </Title>
                </Flex>
            </Overlay>
            <Image
                alt="Anime poster"
                src={animeTitle?.poster?.originalUrl}
                placeholder="blur"
                blurDataURL={variables.imagePlaceholder}
                width={300}
                height={325}
                component={NextImage}
                className={classes.poster}
                radius="xl"
            />
        </Paper>
    );
}