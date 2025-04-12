import ColorSchemeChanger from "@/components/Theme/ColorSchemeChanger/ColorSchemeChanger";
import Link from "next/link";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <div>
            <ColorSchemeChanger />
            <Link href={"/profile/1234"}>
                {dictionary.greetings}
            </Link>
        </div>
    );
}
