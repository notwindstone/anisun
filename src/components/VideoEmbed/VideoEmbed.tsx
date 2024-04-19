'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import React, {useState} from "react";
import {SegmentedControl, Skeleton, Text} from "@mantine/core";
import { Client } from 'kodikwrapper';
import { client } from 'node-shikimori';

export default function VideoEmbed({ id }: { id: number }) {
    const kodikClient = new Client({
        token: process.env.KODIK_TOKEN!,
    });
    const shikimoriClient = client();
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
        const shikimoriAnime = await shikimoriClient.animes.byId({
            id: id,
        })

        const shikimoriFranchise = shikimoriAnime.franchise
        const shikimoriRussianName = shikimoriAnime.russian
        const shikimoriYear = shikimoriAnime.aired_on?.split('-')[0]

        const anilibriaResponse = await getAnilibriaTitle(
            {
                franchise: shikimoriFranchise,
                russianName: shikimoriRussianName,
                year: shikimoriYear
            }
        )

        const kodikResponse = await kodikClient.search({
            shikimori_id: id
        }).then((response) => response.results.shift())

        return { anilibria: anilibriaResponse, kodik: kodikResponse }
    }

    if (!data) {
        return (
            <Skeleton visible={isFetching} height="56.25vw" width="100vw" />
        )
    }

    const anilibriaData = data.anilibria
    const kodikData = data.kodik

    let segmentedControlData = []

    if (kodikData) {
        segmentedControlData.push({ value: 'Kodik', label: 'Kodik (с выбором озвучки и рекламой)' })
    }

    if (anilibriaData) {
        segmentedControlData.push({ value: 'Animeth', label: 'Animeth (только AniLibria, но без рекламы)' })
    }

    if (segmentedControlData.length === 0) {
        return (
            <>
                <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
            </>
        );
    }

    const anilibriaTitle = anilibriaData.names.ru
    const anilibriaPlayer = anilibriaData.player;
    const anilibriaPreview = "https://anilibria.tv/storage/releases/episodes/previews/9542/1/DMzcnlKyg89dRv5f__86bf22cbc0faac3d42cc7b87ea8c712f.jpg"
    const hasAnilibriaPlayer = Object.keys(anilibriaPlayer.list).length > 0

    const kodikPlayer = kodikData?.link

    let currentPlayer

    switch (value) {
        case 'Kodik':
            currentPlayer = (
                <iframe
                    src={kodikPlayer}
                    width="610"
                    height="370"
                    allow="autoplay *; fullscreen *"
                />
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
                <iframe
                    src={kodikPlayer}
                    width="610"
                    height="370"
                    allow="autoplay *; fullscreen *"
                />
            )
            break
    }

    return (
        <>
            <Text>Выберите плеер</Text>
            <SegmentedControl
                withItemsBorders={false}
                defaultValue={value}
                onChange={setValue}
                data={segmentedControlData}
            />
            {currentPlayer}
        </>
    );
}