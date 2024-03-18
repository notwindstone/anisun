import { Text } from '@mantine/core';

export async function Welcome() {
    const res = await fetch('https://api.anilibria.tv/v2/getGenres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    return (
        <>
            {genres}
        </>
    );
}
