import {useQuery} from "@tanstack/react-query";
import VideoSkeleton from "@/components/Video/VideoSkeleton/VideoSkeleton";
import VideoNotFound from "@/components/Video/VideoNotFound/VideoNotFound";
import {useTranslations} from "next-intl";
import {animetize} from "@/lib/animetize/animetize";
import {usePathname} from "next/navigation";
import {AspectRatio} from "@mantine/core";
import classes from "@/components/Video/SovetRomanticaVideo/SovetRomantica.module.css";

export default function VidstreamingVideo() {
    const animetizeClient = animetize();
    const pathname = usePathname();
    const paths = pathname.split('/');
    const idArray = paths[paths.length - 1]
        .split('-');
    idArray.shift();
    const animeId = idArray.join('-');
    const translate = useTranslations('Translations');
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'vidstreaming', animeId],
        queryFn: async () => getVidstreamingVideo(),
    });

    async function getVidstreamingVideo() {
        return await animetizeClient.animes.getLink({
            id: animeId,
            episode: 1,
        });
    }

    if (isPending) {
        return (
            <VideoSkeleton />
        );
    }

    if (error) {
        return (
            <>
                {translate('common__descriptive-error-label')}: {error.message}
            </>
        );
    }

    if (!isPending && !data) {
        return <VideoNotFound />;
    }

    const embedLink = data?.headers?.Referer;

    return (
        <AspectRatio className={'classes.aspectRatio'} ratio={16 / 9}>
            <iframe
                className={classes.frame}
                src={embedLink}
                allow="autoplay *; fullscreen *"
            />
        </AspectRatio>
    );
}