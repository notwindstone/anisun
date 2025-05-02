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