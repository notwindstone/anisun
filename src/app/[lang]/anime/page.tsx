"use client";

import { useContextSelector } from "use-context-selector";
import { AnimePageLoaderContext } from "@/lib/providers/AnimePageLoader";
import AnimePage from "@/components/layout/AnimePage/AnimePage";

// loads when user opens anime page in the web app
export default function Page() {
    const optimisticData = useContextSelector(AnimePageLoaderContext, (value) => value.optimisticData);

    const idMal = optimisticData?.idMal ?? "0";
    const selectedExtension = optimisticData?.selectedExtension ?? "";

    return (
        <AnimePage
            idMal={idMal}
            selectedExtension={selectedExtension}
        />
    );
}
