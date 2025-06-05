"use client";

import Button from "@/components/base/Button/Button";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { setCookie } from "@/lib/actions/cookies";
import { ExtensionsCookieKey } from "@/constants/app";
import { useState } from "react";

export default function Temporary() {
    const [disabled, setDisabled] = useState(false);

    return (
        <Button
            disabled={disabled}
            onClick={async () => {
                setDisabled(true);

                await setCookie({
                    key:   ExtensionsCookieKey,
                    value: JSON.stringify([
                        {
                            name: "kodik",
                            url:  "https://github.com/ame-chan-lol/anisun-kodik-extension/raw/refs/heads/main/dist/bundle.js",
                        },
                        {
                            name: "anilibria",
                            url:  "https://github.com/ame-chan-lol/anisun-anilibria-extension/raw/refs/heads/main/dist/bundle.js",
                        },
                    ]),
                    expiresAt: getRelativeDate({ days: 365 }),
                    httpOnly:  false,
                });

                setDisabled(false);
            }}
            label={"add two extensions"}
        >
            try it
        </Button>
    );
}
