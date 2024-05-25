import {useQuery} from "@tanstack/react-query";
import {AspectRatio, Skeleton} from "@mantine/core";
import getKodikPlayer from "@/lib/actions";
import classes from './KodikVideo.module.css';

export default function KodikVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'kodik', id],
        queryFn: async () => getKodikData(),
    });

    async function getKodikData() {
        return await getKodikPlayer({ shikimoriId: id });
    }

    if (isPending) {
        return (
            <AspectRatio ratio={16 / 9}>
                <Skeleton
                    height="100%"
                    width="100%"
                    radius="md"
                />
            </AspectRatio>
        );
    }

    if (error) {
        return <>Ошибка: {error.message}</>;
    }

    return (
        <AspectRatio ratio={16 / 9}>
            <iframe
                className={classes.frame}
                src={data?.link}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}