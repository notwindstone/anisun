"use client";

import { useContextSelector } from "use-context-selector";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import { useEffect, useState } from "react";

export default function AnimeInfo() {
    const data = useContextSelector(ClientFetchDataContext, (value) => value.data);
    const [ratings/*, setRatings */] = useState<string>("");

    useEffect(() => {
        if (!data) {
            return;
        }

        /*
        (async () => {
            console.log(data.Current);
            //const response = await fetch("https://animestars.org/?do=search&subaction=search&story=SAKAMOTO+DAYS");
            //const shit = await response.text();

            const root = parse(shit);
            const foundLink = root.querySelector(".watchlist-item")?.attributes?.href;
            const linkLast = foundLink?.split("/").at(-1);
            const id = linkLast?.split("-").at(0);

            //const response = await fetch(`https://animestars.org/engine/ajax/controller.php?mod=anime_grabber&module=kodik_playlist_ajax&news_id=${id}&action=load_player`);
            //const smolData = await response.json();

            const smolRoot = parse(smolData);
            const smolShits = smolRoot.querySelectorAll(".watchlist-stats__item");
            const smolChildren = smolShits.map((smolShit) => smolShit.children);

            const actualData = [];

            for (const smolChild of smolChildren) {
                actualData.push({
                    name: smolChild[0].textContent,
                    value: smolChild[2].textContent,
                });
            }

            console.log(actualData);
        })();
         */
    }, [data]);

    return (
        <>
            <div className="bg-amber-200">
                {ratings}
            </div>
            {JSON.stringify(data)}
        </>
    );
}
