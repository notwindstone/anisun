import ColorSchemeChanger from "@/components/layout/ColorSchemeChanger/ColorSchemeChanger";
import PaletteChanger from "@/components/layout/PaletteChanger/PaletteChanger";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import OAuth2Links from "@/components/misc/OAuth2Links/OAuth2Links";
import LayoutChanger from "@/components/layout/LayoutChanger/LayoutChanger";
import Divider from "@/components/base/Divider/Divider";
import type { Locale } from "@/i18n-config";
import { AccountPageItems } from "@/constants/translated";

export default async function Page({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;

    return (
        <div className="flex flex-col pb-4 px-4 gap-4 mx-auto max-w-384">
            <p className="text-2xl font-medium leading-none pt-8">
                {AccountPageItems[lang].accountTitle}
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                {AccountPageItems[lang].accountDescription}
            </p>
            <Divider />
            <OAuth2Links />
            <p className="text-2xl font-medium leading-none pt-8">
                {AccountPageItems[lang].settingsTitle}
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                {AccountPageItems[lang].settingsDescription}
            </p>
            <Divider />
            <p className="text-lg leading-none pt-2">
                {AccountPageItems[lang].languageTitle}
            </p>
            <div className="flex flex-wrap gap-2">
                <LocaleSwitcher />
            </div>
            <p className="text-lg leading-none pt-2">
                {AccountPageItems[lang].accentColorTitle}
            </p>
            <div className="flex flex-wrap gap-2">
                <PaletteChanger
                    colors={AccentColors}
                    propertyKey={"accent"}
                />
            </div>
            <p className="text-lg leading-none pt-2">
                {AccountPageItems[lang].layoutConfigTitle}
            </p>
            <div className="flex flex-wrap gap-2">
                <PaletteChanger
                    colors={BaseColors}
                    propertyKey={"base"}
                />
                <ColorSchemeChanger />
                <LayoutChanger />
            </div>
        </div>
    );
}
