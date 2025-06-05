"use client";

export default function ExtensionWrapper({
    idMal,
    url,
}: {
    idMal: number;
    url: string;
}) {
    return (
        <>
            {idMal}
            {url}
        </>
    );
}
