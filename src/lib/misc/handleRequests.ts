import { userAgent } from "next/server";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { UsersOnlineCountLRUCache } from "@/lib/cache/LRUCaches";

export default function handleRequests({
    headers,
}: {
    headers: ReadonlyHeaders;
}) {
    const { browser, cpu, os, device } = userAgent({
        headers: headers,
    });
    const currentDate = new Date();

    const timeInfo = `[${currentDate.toLocaleTimeString()}, ${currentDate.toDateString()}]:`;
    const browserInfo = (browser?.name || browser?.version) ? `${browser?.name ?? ""} ${browser?.version ?? ""},` : "";
    const cpuInfo = cpu?.architecture ? `${cpu.architecture},` : "";
    const osInfo = (os?.name || os?.version) ? `${os?.name ?? ""} ${os?.version ?? ""},` : "";
    const deviceInfo = device.type ? `${device.type ?? ""}` : "";

    // to show online users count on the website
    UsersOnlineCountLRUCache.set(`${headers.get("User-Agent")}`, 1);

    console.log(
        timeInfo,
        "request",
        "-",
        browserInfo,
        cpuInfo,
        osInfo,
        deviceInfo,
    );
}
