export type ThemeContext = {
    theme: {
        color?: string;
    };
    setTheme: ({ color }: { color: string }) => void;
}