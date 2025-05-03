"use client";

import Image, { ImageProps } from "next/image";
import { ImagePlaceholder } from "@/constants/app";
import { useState } from "react";

export default function ConfiguredImage({
    ...properties
}: Partial<ImageProps> & {
    alt: string;
}) {
    const [opacity, setOpacity] = useState(0);

    return (
        <>
            <Image
                { ...properties }
                style={{
                    opacity,
                    ...properties.style,
                }}
                src={properties?.src ?? ImagePlaceholder}
                alt={properties.alt}
                onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    properties?.onLoad?.(event);
                    setOpacity(1);
                }}
            />
        </>
    );
}