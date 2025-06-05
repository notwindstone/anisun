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
                <div
                    className="flex flex-col gap-4 items-center justify-center h-full w-full bg-neutral-200 dark:bg-neutral-900"
                >
                    <p className="leading-none text-xl sm:text-4xl font-semibold">
                        Error...
                    </p>
                    <p className="leading-none opacity-60 text-sm sm:text-lg">
                        Failed to render your extension.
                    </p>
                </div>
            );
        }}>
            <Suspense fallback={
                <div
                    className="flex flex-col gap-4 items-center justify-center h-full w-full bg-neutral-200 dark:bg-neutral-900 animate-pulse"
                >
                    <p className="leading-none text-xl sm:text-4xl font-semibold">
                        Waiting...
                    </p>
                    <p className="leading-none opacity-60 text-sm sm:text-lg">
                        Fetching data from the extension.
                    </p>
                </div>
            }>
                <div id="extensions-root-id" className="relative w-full overflow-hidden aspect-video">
                    <div
                        className="flex flex-col gap-4 items-center justify-center h-full w-full bg-neutral-200 dark:bg-neutral-900 animate-pulse"
                    >
                        <p className="leading-none text-xl sm:text-4xl font-semibold">
                            Loading...
                        </p>
                        <p className="leading-none opacity-60 text-sm sm:text-lg px-2 text-center">
                            Your extension is loading. If it&apos;s taking too long, try resetting it.
                        </p>
                        <Button
                            onClick={refresh}
                            label="reset the extension"
                        >
                            Reset
                        </Button>
                    </div>
                    <RemoteComponent url={url} />
                </div>
            </Suspense>
        </ErrorBoundary>
    );
}
