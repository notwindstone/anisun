"use client"

import Link from "next/link";
import Comments from "@/components/Comments/Comments";

export default function Home() {
    return (
        <>
            <Link href="/titles">Test</Link>
            <Comments />
        </>
    )
}