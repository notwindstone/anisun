"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Button from "@/components/base/Button/Button";
import ExtensionSkeleton from "@/components/extensions/ExtensionSkeleton/ExtensionSkeleton";
import {
    createRemoteComponent,
    createRequires,
} from "@paciolan/remote-component";
import { resolve } from "@/../remote-component.config.js";

// @ts-expect-error | explanation:
// this line of code is taken from the docs and is working like a charm
const requires = createRequires(resolve);

function refresh() {
    if (globalThis === undefined) {
        return;
    }

    globalThis.location.reload();
}

export default function ExtensionWrapper({
    isCSS,
    url,
    isCustomPage,
}: {
    /** Experimental thing to possibly get rid of hydration issues */
    isCSS?: boolean;
    url: string;
    isCustomPage?: boolean;
}) {
    const [/*scriptCode, setScriptCode*/] = useState<string>("console.log('Waiting for the CSS extensions...')");
    // if a remote component doesn't return anything, but just manually injects itself to the relative root node
    // then we need to recreate it every time url changes to avoid buggy af behaviour
    const RemoteComponent = useMemo(
        () => createRemoteComponent({ requires }),
        [url],
    );

    useEffect(() => {
        return;
        if (!isCSS) {
            return;
        }

        // unfortunately, script tags with `src={url}` don't work
        // because response from the GitHub returns `text/plain` format
        // that's why we manually fetch the code and pass it to the script tag
        (async () => {
            const response = await fetch(url);
            const code = await response.text();

            const script = document.createElement("script");

            script.text = code;
            script.type = "module";

            document.head.append(script);
        })();
    }, [isCSS, url]);

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
                        <RemoteComponent url={url} />
                    </div>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
