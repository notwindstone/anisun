"use client";

import RemoteComponent from "@/components/extensions/RemoteComponent/RemoteComponent";

export default function ExtensionWrapper({
    idMal,
    url,
}: {
    idMal: number;
    url: string;
}) {
    return (
        <>
            <RemoteComponent url={url} idMal={idMal} />
        </>
    );
}
