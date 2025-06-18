"use client";

import { useContextSelector } from "use-context-selector";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import HomeTitles from "@/components/layout/HomeTitles/HomeTitles";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { Locale } from "@/i18n-config";

export default function HomeTitlesClient({
    lang,
}: {
    lang: Locale;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const data: Awaited<ReturnType<typeof getGraphQLResponse>> = useContextSelector(ClientFetchDataContext, (value) => value.data);

    return (
        <HomeTitles
            lang={lang}
            theme={theme}
            base={base}
            data={data}
        />
    );
}
