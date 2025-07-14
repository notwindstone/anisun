export default async function malToAnilibria({
    idMal,
}: {
    idMal: number;
}): Promise<number | undefined> {
    let animes;

    try {
        const response = await fetch("https://raw.githubusercontent.com/notwindstone/MALToAnything/refs/heads/main/anilibria/anilibria-mapped.json", {
            next: {
                // 24 hours cache
                revalidate: 60 * 60 * 24,
            },
        });
        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
            console.error("malToAnilibria.ts error:", "Anilibria Mappings Response returned invalid data");

            return undefined;
        }

        animes = data;
    } catch (error) {
        console.error("malToAnilibria.ts error:", error);

        return undefined;
    }

    for (const anime of animes) {
        if (anime.idMal === idMal) {
            return anime.idAnilibria;
        }
    }

    return undefined;
}
