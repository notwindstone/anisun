import { ShikimoriType, ShikimoriUserType } from "@/types/OAuth2/Shikimori.type";
import { AnilistType, AnilistUserType } from "@/types/OAuth2/Anilist.type";
import { MALType, MALUserType } from "@/types/OAuth2/MAL.type";

export type OAuth2ProvidersType = ShikimoriType | AnilistType | MALType;
export type OAuth2ProvidersUserType = ShikimoriUserType | AnilistUserType | MALUserType;