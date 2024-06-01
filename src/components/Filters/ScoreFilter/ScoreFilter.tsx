import useCustomTheme from "@/hooks/useCustomTheme";
import {useState} from "react";
import {Slider} from "@mantine/core";

export default function ScoreFilter() {
    const { theme } = useCustomTheme();
    const [score, setScore] = useState(7);

    return (
        <Slider
            inverted
            value={score}
            onChange={setScore}
            marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' },
            ]}
            color={theme.color}
            min={1}
            max={10}
        />
    );
}