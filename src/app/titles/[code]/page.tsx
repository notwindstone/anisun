import {Metadata} from "next";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";
import Link from "next/link";
import CommentList from "@/components/Comments/CommentList/CommentList";
import {client} from "@/lib/shikimori/client";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const shikimori = client();
    const shikimoriId = params.code.split('-')[0]

    const anime = await shikimori.animes.byId({ ids: shikimoriId })

    const placeholderTitle = 'Просмотр аниме на Animeth'
    const placeholderDescription = 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере'

    if (!anime) {
        return {
            title: placeholderTitle,
            description: placeholderDescription,
            openGraph: {
                siteName: 'Animeth',
                type: "website",
                title: placeholderTitle,
                description: placeholderDescription,
            }
        }
    }

    return {
        title: anime.russian,
        description: anime.description,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: anime.russian,
            description: anime.description ?? placeholderDescription,
        }
    }
}

export default async function Page({ params }: { params: { code: string } }) {
    const shikimoriId = parseInt(params.code.split('-')[0])

    return (
        <>
            <Link href="/titles">Вернуться</Link>
            <div>{params.code}</div>
            <VideoEmbed
                id={shikimoriId}
            />
            <CommentList titleCode={params.code} />
        </>
    );
}