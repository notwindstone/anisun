import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";

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

    return (
        <DecoratedButton
            autoContrast={isActive && true}
            radius="md"
            style={{
                background: isActive ? theme.color : "none"
            }}
            onClick={changeEpisode}
        >
            Серия {episodeCount}
        </DecoratedButton>
    );
}