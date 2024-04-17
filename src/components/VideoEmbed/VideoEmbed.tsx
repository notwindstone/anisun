'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import React, {useState} from "react";
import {SegmentedControl, Skeleton, Text} from "@mantine/core";
import {AnimeTitleResponseType} from "@/types/AnimeTitleResponseType";
import {kodik} from "@/lib/kodik/kodik";

export default function VideoEmbed({ code }: { code: string }) {
    const [value, setValue] = useState('Kodik')
    const { isFetching, data } = useQuery({
        queryKey: ['anime', code],
        queryFn: async () => fetchAnime(code),
    });

    async function fetchAnime(code: string) {
        const anilibriaResponse: AnimeTitleResponseType = await anilibria.title.code(code)
        const kodikResponse = await kodik.code(code)

        return { anilibria: anilibriaResponse, kodik: kodikResponse }
    }

    if (!data) {
        return (
            <Skeleton visible={isFetching} height="56.25vw" width="100vw" />
        )
    }

    const anilibriaData = data.anilibria
    const kodikData = data.kodik

    if (!kodikData || !anilibriaData) {
        return (
            <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
        );
    }

    const anilibriaTitle = anilibriaData.names.ru
    const anilibriaPlayer = anilibriaData.player;
    const anilibriaPreview = "https://anilibria.tv/storage/releases/episodes/previews/9542/1/DMzcnlKyg89dRv5f__86bf22cbc0faac3d42cc7b87ea8c712f.jpg"

    const kodikPlayer = kodikData.results[0].link

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
            if (Object.keys(anilibriaPlayer.list).length === 0) {
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
                data={[
                    { value: 'Kodik', label: 'Kodik (с выбором озвучки и рекламой)' },
                    { value: 'Animeth', label: 'Animeth (только AniLibria, но без рекламы)' }
                ]}
            />
            {currentPlayer}
        </>
    );
}