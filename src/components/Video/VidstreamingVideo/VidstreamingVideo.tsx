import {useQuery} from "@tanstack/react-query";
import VideoSkeleton from "@/components/Video/VideoSkeleton/VideoSkeleton";
import VideoNotFound from "@/components/Video/VideoNotFound/VideoNotFound";
import {useTranslations} from "next-intl";

export default function VidstreamingVideo({ id }: { id: string }) {
    const translate = useTranslations('Translations');
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'vidstreaming', id],
        queryFn: async () => getVidstreamingVideo(),
    });

    async function getVidstreamingVideo() {
        return '';
    }
    console.log(id);

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

    return (
        <>
        </>
    );
}