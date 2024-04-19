import {Badge, Image, Paper} from "@mantine/core";
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
            <Badge color="violet">{translateShikimoriStatus(animeTitle.status)}</Badge>
            <div>
                {animeTitle.score}
                {animeTitle.aired_on?.split('-')[0]}
                {animeTitle.episodes}
                {animeTitle.russian}
            </div>
            <Image
                alt="Anime poster"
                src={shikimoriURL + animeTitle.image.original}
                placeholder="blur"
                blurDataURL="/blurredPlaceholderImage.png"
                width={300}
                height={400}
                component={NextImage}
                className={classes.poster}
                radius="sm"
            />
        </Paper>
    );
}