"use client";

import RemoteComponent from "@/components/extensions/RemoteComponent/RemoteComponent";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Button from "@/components/base/Button/Button";

function refresh() {
    if (globalThis === undefined) {
        return;
    }

    globalThis.location.reload();
}

export default function ExtensionWrapper({
    url,
}: {
    url: string;
}) {
    return (
        <ErrorBoundary errorComponent={() => {
            return (
                <div className="bg-black text-white">
                    Error happened.
                </div>
            );
        }}>
            <Suspense fallback={
                <div className="bg-black text-white">
                    Loading...
                </div>
            }>
                <div id="extensions-root-id" className="relative w-full overflow-clip aspect-video">
                    <p className="bg-black text-white">
                        Your extension is loading...
                    </p>
                    <Button
                        onClick={refresh}
                        label="reset the extension"
                    >
                        Reset
                    </Button>
                    <RemoteComponent url={url} />
                </div>
            </Suspense>
        </ErrorBoundary>
    );
}
