"use client";

import Button from "@/components/base/Button/Button";
import { setCookie } from "cookies-next";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

export default function Temporary() {
    return (
        <Button
            onClick={() => {
                setCookie("extensions", JSON.stringify([
                    {
                        name: "kodik",
                        url:  "https://github.com/ame-chan-lol/anisun-kodik-extension/raw/refs/heads/main/dist/bundle.js",
                    },
                    {
                        name: "anilibria",
                        url:  "https://github.com/ame-chan-lol/anisun-anilibria-extension/raw/refs/heads/main/dist/bundle.js",
                    },
                ]), {
                    expires:  getRelativeDate({ days: 365 }),
                    path:     "/",
                    secure:   false,
                    httpOnly: true,
                    sameSite: "lax",
                });
            }}
            label={"add two extensions"}
        >
            try it
        </Button>
    );
}
