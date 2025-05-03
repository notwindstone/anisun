// Adds at most 1000ms (average ~400ms) to the FCP for really unlucky people
// who decided to open the website when the cache expired.
// Because of the cache, most of the time it's just 1-3ms,
// and the anime data will load instantly on the client.
import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import ClientFetch from "@/components/Hero/ClientFetch/ClientFetch";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";

const timeout = 1000;

export default async function ServerFetch() {
    let data;

    try {
        data = await fetchHeroTitle({
            // Abort fetch after 1000ms
            signal: AbortSignal.timeout(timeout),
            next: {
                // Revalidate cache at most every day
                revalidate: 60 * 60 * 24,
            },
        });
    } catch {
        return (
            <>
                <ClientFetch />
            </>
        );
    }

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}