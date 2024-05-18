import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useInViewport} from "@mantine/hooks";
import {Box, Image, Overlay, Paper, rem, Text, Title, Transition} from "@mantine/core";
import Link from "next/link";
import classes from './HeroCard.module.css';
import {variables} from "@/configs/variables";
import NextImage from "next/image";

export default function HeroCard({ animeTitle }: { animeTitle: AnimeType }) {
    const { ref, inViewport } = useInViewport();

    if (!animeTitle) {
        return
    }

    return (
        <Paper
            ref={ref}
            component={Link}
            href={`/titles/${animeTitle?.url?.replace('https://shikimori.one/animes/', '')}`}
            className={classes.card}
            radius={0}
        >
            <Transition
                mounted={inViewport}
                transition="pop"
                duration={1000}
                timingFunction="ease"
            >
                {
                    (styles) => (
                        <>
                            <Overlay
                                className={classes.info}
                                p={rem(24)}
                                style={styles}
                            >
                                <Title>Some title</Title>
                                <Text>DescriptionDescriptionDescriptionDescription</Text>
                            </Overlay>
                            <Image
                                style={styles}
                                alt="Anime poster"
                                src={animeTitle?.poster?.originalUrl}
                                placeholder="blur"
                                blurDataURL={variables.imagePlaceholder}
                                component={NextImage}
                                className={classes.poster}
                                radius={0}
                                fill
                            />
                        </>
                    )
                }
            </Transition>
        </Paper>
    )
}