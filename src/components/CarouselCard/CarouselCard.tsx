import {Badge, Flex, Group, Image, Overlay, Paper} from "@mantine/core";
import classes from './CarouselCard.module.css'
import translateShikimoriStatus from "@/utils/translateShikimoriStatus";
import NextImage from "next/image";
import {AnimeBasic} from "node-shikimori";

export default function CarouselCard({ animeTitle, shikimoriURL }: { animeTitle: AnimeBasic, shikimoriURL: string }) {
    return (
        <Paper
            radius="md"
            className={classes.card}
        >
            <Group
                className={classes.overlay}
            >
                <Badge className={classes.status} color="violet">{translateShikimoriStatus(animeTitle.status)}</Badge>
                <Flex className={classes.info}>
                    <Badge className={classes.score} color="green">{animeTitle.score}</Badge>
                    {animeTitle.aired_on?.split('-')[0]}
                    {animeTitle.episodes}
                    {animeTitle.russian}
                </Flex>
            </Group >
            <Image
                alt="Anime poster"
                src={shikimoriURL + animeTitle.image.original}
                placeholder="blur"
                blurDataURL="/blurredPlaceholderImage.png"
                width={225}
                height={317}
                component={NextImage}
                className={classes.poster}
                radius="sm"
            />
        </Paper>
    );
}