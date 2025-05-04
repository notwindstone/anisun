export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // id is the anime's id from MyAnimeList
    const { id } = await params;

    return (
        <>
            {id}
        </>
    );
}