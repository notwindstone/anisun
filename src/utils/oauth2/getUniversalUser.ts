import { UserType } from "@/types/OAuth2/User.type";
import { OAuth2ProvidersUserType } from "@/types/OAuth2/OAuth2Providers.type";

const getUsername = (user: OAuth2ProvidersUserType): string => {
    if (
        "data" in user && (
            typeof user.data === "object" &&
            user.data !== null &&
            "Viewer" in user.data
        ) && (
            typeof user.data.Viewer === "object" &&
            user.data.Viewer !== null &&
            "name" in user.data.Viewer
        )
    ) {
        return `${user.data.Viewer.name}`;
    }

    if ("nickname" in user) {
        return user.nickname;
    }

    return user?.name ?? "";
};
const getAvatar = (user: OAuth2ProvidersUserType): string => {
    if ("avatar" in user) {
        return user.avatar;
    }

    return "";
};

export function getUniversalUser({
    user,
}: {
    user: OAuth2ProvidersUserType;
}): UserType {
    return {
        username: getUsername(user),
        avatar:   getAvatar(user),
    };
}
