export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";
import Link from "next/link";
import Comments from "@/components/Comments/Comments";

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