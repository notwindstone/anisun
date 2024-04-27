"use server"

import Link from 'next/link';
import {Search} from "@/components/Search/Search";
import type {Metadata} from "next";
import SearchBar from "@/components/SearchBar/SearchBar";

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Поиск аниме'
    const description = 'Поиск по аниме сериалам и фильмам через Shikimori API'

    return {
        title: title,
        description: description,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: title,
            description: description,
        }
    }
}

export default async function Page() {
    return (
        <div>
            <Link href="/">Return</Link>
            <Search />
            <SearchBar />
        </div>
    );
}