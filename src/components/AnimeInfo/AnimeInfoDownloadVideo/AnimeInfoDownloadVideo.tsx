import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {QueryClient} from "@tanstack/react-query";


export default function AnimeInfoDownloadVideo({ id }: { id: string }) {
    const queryClient = new QueryClient();
    const data = queryClient.getQueryData(['anime', 'anilibria', id]);

    return (
        <DecoratedButton
            leftSection={<IconDownload />}
            onClick={() => console.log(data)}
        >
            Скачать
        </DecoratedButton>
    );
}