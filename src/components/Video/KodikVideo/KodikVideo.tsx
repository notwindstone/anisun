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

    console.log(data);

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
        <div className={classes.wrapper}>
            <iframe
                className={classes.frame}
                src={data?.link}
                width="610"
                height="370"
                allow="autoplay *; fullscreen *"
            />
        </div>
    );
}