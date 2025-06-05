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
        <div id="extensions-root-please-work">
            <RemoteComponent url={url} idMal={idMal} />
        </div>
    );
}
