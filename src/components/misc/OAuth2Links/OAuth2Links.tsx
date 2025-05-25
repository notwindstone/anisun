import { OAuth2Routes } from "@/constants/routes";
import Button from "@/components/base/Button/Button";
import { cookies } from "next/headers";
import { getCookie } from "@/lib/actions/cookies";
import { AccessTokenCookieKey } from "@/constants/app";
import OAuth2LogOut from "@/components/misc/OAuth2LogOut/OAuth2LogOut";

type entriesType = Array<keyof typeof OAuth2Routes>;

const entries: entriesType = Object.keys(OAuth2Routes) as entriesType;

export default async function OAuth2Links() {
    const cookieStore = await cookies();
    const accessToken = await getCookie({
        key:   AccessTokenCookieKey,
        store: cookieStore,
    });

    if (!accessToken?.value) {
        return (
            <>
                <div className="flex flex-wrap gap-2">
                    {
                        entries.map((entry) => {
                            const { Login, __Icon: Icon, __Name: Name } = OAuth2Routes[entry];

                            return (
                                <a key={entry} href={Login}>
                                    <Button
                                        custom={{
                                            style: "base",
                                        }}
                                        label={`Login using ${Name}`}
                                    >
                                        <div className="fill-black dark:fill-white w-5 h-5">
                                            {Icon}
                                        </div>
                                        <p>
                                            {Name}
                                        </p>
                                    </Button>
                                </a>
                            );
                        })
                    }
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex">
                <OAuth2LogOut />
            </div>
        </>
    );
}