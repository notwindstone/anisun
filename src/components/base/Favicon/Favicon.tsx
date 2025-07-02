"use client";

import faviconNonAI from "@/../public/favicon-x256.webp";
import faviconAI from "@/../public/ai-slop-original.webp";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function Favicon() {
    const logoType = useContextSelector(ConfigsContext, (value) => value.data.other.logo);
    const favicon = logoType === "non-ai" ? faviconNonAI : faviconAI;

    return (
        <div className="select-none w-10 h-10 rounded-md bg-white ring-2 ring-black dark:ring-white drop-shadow-md overflow-clip relative">
            <ConfiguredImage
                className="w-10 h-10 transition"
                src={favicon}
                alt={"Arisu Sakayanagi, a character from Classroom of the Elite"}
            />
        </div>
    );
}
