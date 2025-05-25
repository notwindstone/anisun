import { UserType } from "@/types/OAuth2/User.type";
import { OAuth2ProvidersUserType } from "@/types/OAuth2/OAuth2Providers.type";

const getUsername = (user: OAuth2ProvidersUserType): string => {
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