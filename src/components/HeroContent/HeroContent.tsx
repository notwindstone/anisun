"use client"

import classes from './HeroContent.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@mantine/core";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import axios from "axios";
import {useState} from "react";
import {AnimeType} from "@/types/Shikimori/AnimeType";

export function HeroContent() {
    const currentYear = new Date().getFullYear().toString()
    const [year, setYear] = useState(currentYear)

    const { data, status, error } = useQuery({
        queryKey: ['hero', year],
        queryFn: getRandomTitles,
    });

    async function getRandomTitles() {
        const options = {
            method: 'POST',
            url: 'https://shikimori.one/api/graphql',
            headers: {
                'content-type': 'application/json',
                'User-Agent': 'Animeth'
            },
            data: {
                query: `
                    {
                        animes(limit: 10, status: "ongoing", season: "${year}", order: popularity) {
                            id
                            malId
                            name
                            russian
                            licenseNameRu
                            english
                            japanese
                            synonyms
                            kind
                            rating
                            score
                            status
                            episodes
                            episodesAired
                            duration
                            airedOn {
                                year
                                month
                                day
                                date
                            }
                            releasedOn {
                                year
                                month
                                day
                                date
                            }
                            url
                            season
                        
                            poster {
                                id
                                originalUrl
                                mainUrl
                            }
                        
                            fansubbers
                            fandubbers
                            licensors
                            createdAt
                            updatedAt
                            nextEpisodeAt
                            isCensored
                            
                            screenshots {
                                id
                                originalUrl
                                x166Url
                                x332Url
                            }
                        
                            scoresStats {
                                score
                                count
                            }
                            statusesStats {
                                status
                                count
                            }
                        
                            description
                            descriptionHtml
                            descriptionSource
                        }
                    }
                `
            }
        }

        return await axios
                .request(options)
                .then((response: { data: { data: { animes: AnimeType[] } } }) => response.data.data)
    }

    const carouselSlides = Array.from({ length: 10 })

    if (status === 'success' && data.animes.length < 10) {
        const previousYear = (new Date().getFullYear() - 1).toString()
        setYear(previousYear)
    }

    return (
        <div className={classes.hero}>
            <Carousel slideSize={225} height={325} slideGap="md" controlsOffset="md" controlSize={40} loop dragFree withIndicators>
                {
                    carouselSlides.map((_slide, index) => {
                        return (
                            <Carousel.Slide key={index}>
                                {
                                    status === 'success'
                                        ? (
                                            <>
                                                <CarouselCard animeTitle={data.animes[index]} />
                                            </>
                                        )
                                        : status === 'error' ? (
                                            <>Error: {error.message}</>
                                        ) : (
                                            <Skeleton width={209} height={317} />
                                        )
                                }
                            </Carousel.Slide>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}