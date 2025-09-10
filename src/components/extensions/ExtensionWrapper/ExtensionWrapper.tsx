"use client";

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
    isCustomPage,
}: {
    url: string;
    isCustomPage?: boolean;
}) {
    return (
        <>
            <ErrorBoundary errorComponent={() => {
                return (
                    <div className="relative w-full overflow-hidden aspect-video">
                        <ExtensionSkeleton
                            title="Error..."
                            description="Failed to render your extension."
                        />
                    </div>
                );
            }}>
                <Suspense fallback={
                    <div className="relative w-full overflow-hidden aspect-video">
                        <ExtensionSkeleton
                            title="Waiting..."
                            description="Fetching data from the extension."
                            shouldPulse
                        />
                    </div>
                }>
                    <div id={isCustomPage ? "extensions-custom-page-id-dont-use" : "extensions-root-id"} className={`relative w-full overflow-hidden ${isCustomPage ? "" : "aspect-video"}`}>
                        {
                            isCustomPage ? (
                                <div className="text-lg mx-auto font-semibold">
                                    Loading your extension.
                                </div>
                            ) : (
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
                            )
                        }
                        <div />
                    </div>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
