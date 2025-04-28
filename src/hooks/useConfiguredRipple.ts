import useRipple from "use-ripple-hook";

export default function useConfiguredRipple({
    disabled,
}: {
    disabled?: boolean;
}) {
    const [ripple, event] = useRipple({
        color: "rgba(255, 255, 255, .15)",
        disabled,
    });

    return {
        ripple,
        event,
    };
}