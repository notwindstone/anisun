"use client";

import Button from "@/components/base/Button/Button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/lib/actions/cookies";
import { AccessTokenCookieKey } from "@/constants/app";
import { deleteCookie as deleteClientCookies } from "cookies-next";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function OAuth2LogOut() {
    const signOut = useContextSelector(ConfigsContext, (value) => value.dictionaries?.misc?.signOut);

    return (
        <>
            <Button
                custom={{
                    style: "base",
                }}
                label={"Sign out from your account"}
                onClick={async () => {
                    await deleteCookie({
                        key: AccessTokenCookieKey,
                    });

                    deleteClientCookies("locale");
                }}
            >
                <div className="fill-black dark:fill-white">
                    <LogOut />
                </div>
                <p>
                    {signOut}
                </p>
            </Button>
        </>
    );
}
