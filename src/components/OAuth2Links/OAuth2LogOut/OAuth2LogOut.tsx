"use client";

import { deleteCookie } from "cookies-next";
import { AccessTokenCookieKey, AccountInfoCookieKey } from "@/constants/app";
import Button from "@/components/Button/Button";
import { LogOut } from "lucide-react";

export default function OAuth2LogOut() {
    return (
        <>
            <Button
                custom={{
                    style: "base",
                }}
                label={"Sign out from your account"}
                onClick={() => {
                    deleteCookie(AccessTokenCookieKey);
                    deleteCookie(AccountInfoCookieKey);
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