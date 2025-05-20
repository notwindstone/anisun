"use server";

import { UserType } from "@/types/OAuth2/User.type";
import { getUniversalUser } from "@/utils/oauth2/getUniversalUser";

export async function getUser({
    accessToken,
    fetchUser,
}: {
    accessToken: string;
    fetchUser: (accessToken: string) => Promise<Response>;
}): Promise<UserType | undefined> {
    const response = await fetchUser(accessToken);

    if (!response.ok) {
        return undefined;
    }

    let user: UserType;

    try {
        const data = await response.json();

        user = getUniversalUser({
            user: data,
        });
    } catch (error) {
        console.error("user.ts getUniversalUser error:", error);

        return undefined;
    }

    return user;
}