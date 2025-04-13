export default function Sidebar({
    colors,
    isDark,
}: {
    colors: {
        dark: {
            background: string;
            border: string;
        };
        light: {
            background: string;
            border: string;
        };
    };
    isDark: boolean;
}) {
    return (
        <>
            <div
                className="shrink-0 w-64 h-full border-r-[1px] transition"
                style={{
                    backgroundColor: isDark
                        ? colors.dark.background
                        : colors.light.background,
                    borderColor: isDark
                        ? colors.dark.border
                        : colors.light.border,
                }}
            >
                asdf
            </div>
        </>
    );
}