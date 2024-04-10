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

    return {
        title: anime.names.ru,
        description: anime.description,
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