"use client";

import { useParams, useSearchParams } from "next/navigation";
import AnimePage from "@/components/layout/AnimePage/AnimePage";

// loads when user opens anime page via a URL
export default function Page() {
    const parameters = useParams<
        Partial<{ id: string }>
    >();
    const id = parameters?.id ?? "0";

    const searchParameters = useSearchParams();
    const selectedExtension = searchParameters?.get("selectedExtension") ?? "";

    return (
        <AnimePage
            idMal={id}
            selectedExtension={selectedExtension}
        />
    );
}
