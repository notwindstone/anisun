import { Text } from '@mantine/core';

export async function Welcome() {
    const res = await fetch('https://api.anilibria.tv/v3/genres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    const getRandomTitle = await fetch('https://api.anilibria.tv/v3/title/random');
    const randomTitle = await getRandomTitle.json();
    console.log(randomTitle.player.list[1].hls.fhd);

    return (
        <>
            {genres}
        </>
    );
}
