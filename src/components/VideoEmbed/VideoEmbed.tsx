'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import React, {useState} from "react";
import {Alert, SegmentedControl, Skeleton, Text} from "@mantine/core";
import { Client } from 'kodikwrapper';
import {client} from "@/lib/shikimori/client";
import classes from './VideoEmbed.module.css';
import {IconInfoCircle} from "@tabler/icons-react";

export default function VideoEmbed({ id }: { id: string }) {
    const shikimori = client()
    const kodikClient = new Client({
        token: process.env.KODIK_TOKEN!,
    });
    const [value, setValue] = useState('Kodik')
    const { isFetching, data } = useQuery({
        queryKey: ['anime', id],
        queryFn: async () => fetchAnime(),
    });

    async function getAnilibriaTitle({ franchise, russianName, year }: { franchise: string | null, russianName: string, year: string | undefined }) {
        const anilibriaTitleFromFranchise = await anilibria.search({ title: franchise, year: year })

        if (anilibriaTitleFromFranchise) {
            return anilibriaTitleFromFranchise
        }

        const anilibriaTitleFromRussianName = await anilibria.search({ title: russianName, year: year })

        if (anilibriaTitleFromRussianName) {
            return anilibriaTitleFromRussianName
        }

        return null
    }

    async function fetchAnime() {
        const shikimoriAnime = (await shikimori.animes.byId({
            ids: id,
        })).animes[0]

        const shikimoriEnglishName = shikimoriAnime.name
        const shikimoriRussianName = shikimoriAnime.russian ?? ''
        const shikimoriYear = shikimoriAnime.airedOn?.year.toString() ?? ''

        const anilibriaResponse = await getAnilibriaTitle(
            {
                franchise: shikimoriEnglishName,
                russianName: shikimoriRussianName,
                year: shikimoriYear
            }
        )

        if (!process.env.KODIK_TOKEN) {
            return { anilibria: anilibriaResponse, kodik: null }
        }

        const kodikResponse = await kodikClient.search({
            shikimori_id: parseInt(id)
        }).then((response) => response.results.shift())

        return { anilibria: anilibriaResponse, kodik: kodikResponse }
    }

    if (!data) {
        return (
            <Skeleton visible={isFetching} height="56.25vw" width="100vw" radius="md" />
        )
    }

    const anilibriaData = data.anilibria
    const kodikData = data.kodik

    let segmentedControlData = []
    let anilibriaTitle, anilibriaPlayer, anilibriaPreview, hasAnilibriaPlayer, kodikPlayer

    if (kodikData) {
        segmentedControlData.push({ value: 'Kodik', label: 'Kodik' })

        kodikPlayer = kodikData?.link
    }

    if (anilibriaData) {
        segmentedControlData.push({ value: 'Animeth', label: 'Animeth' })

        anilibriaTitle = anilibriaData.names.ru
        anilibriaPlayer = anilibriaData.player;
        anilibriaPreview = "https://anilibria.tv/storage/releases/episodes/previews/9542/1/DMzcnlKyg89dRv5f__86bf22cbc0faac3d42cc7b87ea8c712f.jpg"
        hasAnilibriaPlayer = Object.keys(anilibriaPlayer.list).length > 0
    }

    if (segmentedControlData.length === 0) {
        return (
            <>
                <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
            </>
        );
    }

    let currentPlayer

    switch (value) {
        case 'Kodik':
            currentPlayer = (
                <div className={classes.wrapper}>
                    <iframe
                        className={classes.frame}
                        src={kodikPlayer}
                        width="610"
                        height="370"
                        allow="autoplay *; fullscreen *"
                    />
                </div>
            )
            break
        case 'Animeth':
            // Некоторые аниме тайтлы не имеют плеера
            if (!hasAnilibriaPlayer) {
                return (
                    <>
                        <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
                    </>
                );
            }

            currentPlayer = (
                <VideoPlayer
                    title={anilibriaTitle}
                    player={anilibriaPlayer}
                    preview={anilibriaPreview}
                />
            )
            break
        default:
            currentPlayer = (
                <div className={classes.wrapper}>
                    <iframe
                        className={classes.frame}
                        src={kodikPlayer}
                        width="610"
                        height="370"
                        allow="autoplay *; fullscreen *"
                    />
                </div>
            )
            break
    }

    const kodikDescription = 'К сожалению, в плеере Kodik нельзя отключить рекламу. Она встроена в плеер и не зависит от нашего сайта. Зато доступен широкий выбор озвучек!'
    const animethDescription = 'В нашем плеере озвучка используется только от AniLibria.'

    return (
        <>
            <Text>Выберите плеер</Text>
            <Alert variant="light" color="gray" title="Информация о плеере" icon={<IconInfoCircle />}>
                {
                    value === 'Kodik' ? kodikDescription : animethDescription
                }
            </Alert>
            <SegmentedControl
                className={classes.control}
                withItemsBorders={false}
                defaultValue={value}
                onChange={setValue}
                data={segmentedControlData}
            />
            <div className={classes.root}>
                {currentPlayer}
            </div>
        </>
    );
}