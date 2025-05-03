import ServerFetch from "@/components/Hero/ServerFetch/ServerFetch";
import { Suspense } from "react";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export default function Hero({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    return (
        <>
            <div className="group relative overflow-clip w-full h-full aspect-video">
                <Suspense fallback={
                    <SkeletonCard theme={theme} base={base} />
                }>
                    <ServerFetch />
                </Suspense>
            </div>
        </>
    );
}