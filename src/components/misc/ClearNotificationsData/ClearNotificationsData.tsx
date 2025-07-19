"use client";

import Button from "@/components/base/Button/Button";
import { DarkReaderNotificationLocalStorageKey, OldBrowserNotificationLocalStorageKey } from "@/constants/app";

export default function ClearNotificationsData() {
    return (
        <Button
            onClick={() => {
                localStorage?.removeItem(OldBrowserNotificationLocalStorageKey);
                localStorage?.removeItem(DarkReaderNotificationLocalStorageKey);
            }}
            custom={{
                style: "base",
            }}
            label="Clear notifications local storage data"
        >
            Clear notifications data
        </Button>
    );
}
