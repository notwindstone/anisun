import Link from "next/link";
import { cookies } from "next/headers";
import { AccessTokenCookieKey, AccessTokenProviderCookieKey } from "@/constants/app";

export default async function Page() {
    const cookieStore = await cookies();
    const accessTokenProvider = cookieStore.get(AccessTokenProviderCookieKey)?.value;
    const accessToken = cookieStore.get(AccessTokenCookieKey)?.value;
    console.log(accessToken, accessTokenProvider);

    return (
        <div className="flex items-center p-4 gap-4">
            <Link href={"/"}>
                home
            </Link>
        </div>
    );
}
