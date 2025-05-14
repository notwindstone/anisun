"use client";

import Button from "@/components/Button/Button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/lib/actions/cookies";
import { AccessTokenCookieKey } from "@/constants/app";
import { deleteCookie as deleteClientCookies } from "cookies-next";

export default function OAuth2LogOut() {
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
                    Sign out
                </p>
            </Button>
        </>
    );
}