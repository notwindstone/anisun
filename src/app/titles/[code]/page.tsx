import {Metadata} from "next";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";
import Link from "next/link";
import {anilibria} from "@/lib/anilibria/anilibria";
import CommentList from "@/components/Comments/CommentList/CommentList";

/*export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const code = params.code

    const anime = await anilibria.title.code(code)

    if (!anime) {
        return {
            title: 'Просмотр аниме на Animeth',
            description: 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере',
            openGraph: {
                siteName: 'Animeth',
                type: "website",
                title: 'Просмотр аниме на Animeth',
                description: 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере',
            }
        }
    }

    return {
        title: anime.names.ru,
        description: anime.description,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: anime.names.ru,
            description: anime.description,
        }
    }
}*/

export default async function Page({ params }: { params: { code: string } }) {
    return (
        <>
            <Link href="/titles">Вернуться</Link>
            <div>{params.code}</div>
            {/*<VideoEmbed
              code={params.code}
            />*/}
            <CommentList titleCode={params.code} />
        </>
    );
}