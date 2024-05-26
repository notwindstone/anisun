import useCustomTheme from "@/hooks/useCustomTheme";
import {UnstyledButton} from "@mantine/core";

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
        <UnstyledButton
            onClick={changeEpisode}
        >
            Серия {episodeCount}
        </UnstyledButton>
    );
}