import {Metadata} from "next";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";
import Link from "next/link";
import Comments from "@/components/Comments/Comments";
import {anilibria} from "@/lib/anilibria/anilibria";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const code = params.code

    const anime = await anilibria.title.code(code)
        .catch((error) => {
            console.log(error)
        })

    return {
        title: anime.names.ru ?? 'Просмотр аниме на Animeth',
        description: anime.description ?? 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере',
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: anime.names.ru ?? 'Просмотр аниме на Animeth',
            description: anime.description ?? 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере',
        }
    }
}

export default async function Page({ params }: { params: { code: string } }) {
    return (
        <>
            <Link href="/titles">Вернуться</Link>
            <div>{params.code}</div>
            <VideoEmbed
              code={params.code}
            />
            <Comments titleCode={params.code} />
        </>
    );
}