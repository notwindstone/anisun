import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useTranslations} from "next-intl";

export default function SovetRomanticaVideoButton({
    isActive,
    changeEpisode,
    episodeCount,
}: {
    isActive: boolean;
    changeEpisode: () => void;
    episodeCount?: number;
}) {
    const { theme } = useCustomTheme();
    const translate = useTranslations('Translations');

    return (
        <DecoratedButton
            autoContrast={isActive && true}
            radius="md"
            style={{
                background: isActive ? theme.color : "none"
            }}
            onClick={changeEpisode}
        >
            {translate('common__episode-label')} {episodeCount}
        </DecoratedButton>
    );
}