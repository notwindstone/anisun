import {rem, Text} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {variables} from "@/configs/variables";

const colors = variables.mantineColors

export default function GradientTitle() {
    let nextColor;

    const { theme } = useCustomTheme();
    const color = theme.color ?? 'dark';
    const mantineColorIndex = colors.indexOf(color);

    if (mantineColorIndex !== -1) {
        nextColor
            = colors[mantineColorIndex + 1] ?? colors[mantineColorIndex - 1]
    } else {
        nextColor = color
    }

    return (
        <Text
            inline
            size={rem(32)}
            fw={700}
            variant="gradient"
            gradient={{ from: color, to: nextColor, deg: 90 }}
        >
            ANIMETH
        </Text>
    )
}