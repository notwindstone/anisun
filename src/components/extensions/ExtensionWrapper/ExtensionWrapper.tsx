"use client";

import RemoteComponent from "@/components/extensions/RemoteComponent/RemoteComponent";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Button from "@/components/base/Button/Button";
import ExtensionSkeleton from "@/components/extensions/ExtensionSkeleton/ExtensionSkeleton";

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
                <ExtensionSkeleton
                    title="Error..."
                    description="Failed to render your extension."
                />
            );
        }}>
            <Suspense fallback={
                <ExtensionSkeleton
                    title="Waiting..."
                    description="Fetching data from the extension."
                    shouldPulse
                />
            }>
                <div id="extensions-root-id" className="relative w-full overflow-hidden aspect-video">
                    <ExtensionSkeleton
                        title="Loading..."
                        description="Your extension is loading. If it's taking too long, try resetting it."
                        shouldPulse
                    >
                        <Button
                            onClick={refresh}
                            label="reset the extension"
                        >
                            Reset
                        </Button>
                    </ExtensionSkeleton>
                    <RemoteComponent url={url} />
                </div>
            </Suspense>
        </ErrorBoundary>
    );
}
