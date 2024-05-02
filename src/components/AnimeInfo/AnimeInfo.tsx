"use client"

import {Breadcrumbs, Group, Image, Text, Title} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import Link from "next/link";
import translateShikimoriKind from "@/utils/translateShikimoriKind";
import {usePathname} from "next/navigation";
import classes from './AnimeInfo.module.css';

export default function AnimeInfo({ shikimoriId }: { shikimoriId: string }) {
    const pathname = usePathname();
    const shikimori = client();
    const {
        data,
        status,
        error
    } = useQuery({
        queryKey: ['animeInfo', shikimoriId],
        queryFn: async () => getAnime(shikimoriId),
    });

    async function getAnime(id: string) {
        return (await shikimori.animes.byId({
            ids: id,
        })).animes[0]
    }

    const kind = translateShikimoriKind(data?.kind ?? '')

    const breadcrumbs = [
        { title: 'Аниме', link: '/' },
        { title: kind, link: '/titles/' },
        { title: data?.genres?.[0]?.russian, link: `/titles/` },
        { title: data?.russian, link: pathname }
    ].map((item, index) => (
        <Link href={item.link} key={index}>
            {item.title}
        </Link>
    ));

    return status === 'pending' ? (
        <>Loading</>
    ) : status === 'error' ? (
        <>Error: {error?.message}</>
    ) : (
        <>
            <Title>{data?.russian} <span>/</span> {data?.name}</Title>
            <Breadcrumbs className={classes.breadcrumbs}>
                {breadcrumbs}
            </Breadcrumbs>
            <Image
                alt="Anime poster"
                src={data?.poster?.originalUrl}
                placeholder="blur"
                blurDataURL={globalVariables.imagePlaceholder}
                width={700}
                height={990}
                component={NextImage}
            />
        </>
    )
}