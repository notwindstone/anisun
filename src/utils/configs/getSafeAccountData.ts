import { UserType } from "@/types/OAuth2/User.type";
import { PlaceholderAccount } from "@/constants/configs";

export default function getSafeAccountData({
    account,
}: {
    account: unknown;
}): UserType {
    let avatar: string | undefined;
    let username: string | undefined;

    if (typeof account !== "object" || account === null) {
        return PlaceholderAccount;
    }

    if (
        "avatar" in account
        && typeof account.avatar === "string"
    ) {
        avatar = account.avatar;
    }

    if (
        "username" in account
        && typeof account.username === "string"
    ) {
        username = account.username;
    }

    return {
        avatar:   avatar ?? PlaceholderAccount.avatar,
        username: username ?? PlaceholderAccount.username,
    };
}
