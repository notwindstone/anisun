import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export default function TrendingAnimes({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    return (
        <>
            <div className="flex flex-col gap-4 px-4">
                <p className="text-2xl font-medium">
                    Trending Now
                </p>
            </div>
        </>
    );
}