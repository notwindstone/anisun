"use client";

import AnilibriaVideo from "@/components/Video/AnilibriaVideo/AnilibriaVideo";

export default function Video({ id }: { id: string }) {
    console.log(id);

    return (
        <>
            <AnilibriaVideo id={id} />
        </>
    );
}