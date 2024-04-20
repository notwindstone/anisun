import {Badge, Flex, Group, Image, Paper} from "@mantine/core";
import classes from './CarouselCard.module.css'
import translateShikimoriStatus from "@/utils/translateShikimoriStatus";
import NextImage from "next/image";

export default function CarouselCard({ animeTitle }: { animeTitle: {} }) {
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
                src={animeTitle.poster.originalUrl}
                placeholder="blur"
                blurDataURL="/blurredPlaceholderImage.png"
                width={300}
                height={325}
                component={NextImage}
                className={classes.poster}
                radius="sm"
            />
        </Paper>
    );
}