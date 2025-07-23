"use server";

import * as arctic from "arctic";
import { OAuth2Routes } from "@/constants/routes";

export const ShikimoriProvider = async () => {
    return new arctic.Shikimori(
        process.env.SHIKIMORI_CLIENT_ID!,
        process.env.SHIKIMORI_SECRET_KEY!,
        process.env.HOST_URL! + OAuth2Routes.Shikimori.Callback,
    );
};
export const AnilistProvider = async () => {
    return new arctic.AniList(
        process.env.ANILIST_CLIENT_ID!,
        process.env.ANILIST_SECRET_KEY!,
        process.env.HOST_URL! + OAuth2Routes.Anilist.Callback,
    );
};
export const MALProvider = async () => {
    return new arctic.MyAnimeList(
        process.env.ANILIST_CLIENT_ID!,
        process.env.ANILIST_SECRET_KEY!,
        process.env.HOST_URL! + OAuth2Routes.MAL.Callback,
    );
};