import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";

export default function getCarouselCardDate({
    english,
    locale,
    status,
    episodes,
    episodesAired,
    russian,
    score,
    original,
}: {
    english: string | null | undefined;
    locale: string | undefined;
    status: string | null | undefined;
    episodes: number | undefined;
    episodesAired: number | undefined;
    russian: string | null | undefined;
    score: number | null | undefined;
    original: string | undefined;
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

    animeName = animeName ?? original;

    return {
        animeStatus,
        isAnnounced,
        scoreBadgeColor,
        episodesBadge,
        animeName,
    };
}