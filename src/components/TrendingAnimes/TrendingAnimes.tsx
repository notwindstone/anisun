import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import Cards from "@/components/Cards/Cards";
import ClientFetch from "@/components/ClientFetch/ClientFetch";

export default function TrendingAnimes({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div />
                <p className="text-2xl font-medium leading-none px-4">
                    Trending Now
                </p>
                <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none px-4">
                    Explore currently popular anime titles
                </p>
                <ClientFetch
                    queryKey={["trending", "anime"]}
                    method={"SearchTitles"}
                    pendingUI={
                        <Cards isPending />
                    }
                    errorUI={
                        <Cards isError />
                    }
                >
                    <Cards />
                </ClientFetch>
            </div>
        </>
    );
}