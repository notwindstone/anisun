import { Uwuifier } from "@/constants/localization";

export default function translate({
    text,
    locale,
}: {
    text: string;
    locale: string;
}): string {
    return locale === "uwu"
        ? Uwuifier.uwuifySentence(text)
        : text;
}