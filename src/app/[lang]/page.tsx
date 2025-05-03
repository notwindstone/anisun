import Hero from "@/components/Hero/Hero";
import { getCookie } from "@/lib/actions/cookies";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";

export default async function Home() {
    const configs = await getCookie({
        key: CookieConfigKey,
    });
    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data: configs,
        fallbackData: InitialConfig,
    });
    const { theme, colors: { base } } = getSafeConfigValues({
        config: parsedConfigData,
    });

    return (
        <div>
            <Hero theme={theme} base={base} />
        </div>
    );
}
