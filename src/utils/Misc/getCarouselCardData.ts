import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";

export default function getCarouselCardDate({
    english,
    locale,
    status,
    episodes,
    episodesAired,
    russian,
    score,
}: {
    english: string | null | undefined;
    locale: string | null | undefined;
    status: string | null | undefined;
    episodes: number | null | undefined;
    episodesAired: number | null | undefined;
    russian: string | null | undefined;
    score: number | null | undefined;
}) {
    const animeStatus = status ?? "";
    const isAnnounced = animeStatus === 'anons';
    const isReleased = animeStatus === 'released';
    const scoreBadgeColor = getScoreBadgeColor({ score: score });
    const episodesBadge = isReleased
        ? `${episodes} / ${episodes}`
        : `${episodesAired} / ${episodes}`;

    let animeName;

    switch (locale) {
        case "en":
            animeName = english;
            break;
        case "ru":
            animeName = russian;
            break;
        default:
            animeName = english;
            break;
    }

    return {
        animeStatus,
        isAnnounced,
        scoreBadgeColor,
        episodesBadge,
        animeName,
    };
}