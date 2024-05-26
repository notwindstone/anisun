import useCustomTheme from "@/hooks/useCustomTheme";
import {UnstyledButton} from "@mantine/core";
import classes from './SovetRomanticaVideoButton.module.css';

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
            style={{
                background: isActive ? theme.color : "none"
            }}
            onClick={changeEpisode}
        >
            Серия {episodeCount}
        </UnstyledButton>
    );
}