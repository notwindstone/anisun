import {StatusType} from "@/types/Shikimori/StatusType";
import {IncompleteDateType} from "@/types/Shikimori/IncompleteDateType";
import {PosterType} from "@/types/Shikimori/PosterType";
import {GenreType} from "@/types/Shikimori/GenreType";
import {StudioType} from "@/types/Shikimori/StudioType";
import {ExternalLinkType} from "@/types/Shikimori/ExternalLinkType";
import {PersonRoleType} from "@/types/Shikimori/PersonRoleType";
import {CharacterRoleType} from "@/types/Shikimori/CharacterRoleType";
import {RelatedType} from "@/types/Shikimori/RelatedType";
import {VideoType} from "@/types/Shikimori/VideoType";
import {ScreenshotType} from "@/types/Shikimori/ScreenshotType";
import {ScoreStatType} from "@/types/Shikimori/ScoreStatType";
import {StatusStatType} from "@/types/Shikimori/StatusStatType";

export type AnimeType = {
    airedOn: IncompleteDateType | null;
    characterRoles: CharacterRoleType[];
    createdAt: string;
    description: string | null;
    descriptionHtml: string | null;
    descriptionSource: string | null;
    duration: number | null;
    english: string | null;
    episodes: number;
    episodesAired: number;
    externalLinks: ExternalLinkType[];
    fandubbers: string[];
    fansubbers: string[];
    franchise: string | null;
    genres: GenreType[];
    id: string;
    isCensored: boolean | null;
    japanese: string | null;
    kind: string | null;
    licenseNameRu: string | null;
    licensors: string[];
    malId: string | null;
    name: string;
    nextEpisodeAt: string | null;
    personRoles: PersonRoleType[];
    poster: PosterType | null;
    rating: string | null;
    related: RelatedType[];
    releasedOn: IncompleteDateType | null;
    russian: string | null;
    score: number | null;
    scoresStats: ScoreStatType[];
    screenshots: ScreenshotType[];
    season: string | null;
    status: StatusType | null;
    statusesStats: StatusStatType[];
    studios: StudioType[];
    synonyms: string[];
    topic: string | null;
    updatedAt: string;
    url: string;
    userRate: string | null;
    videos: VideoType[];
}