export type ThemeContext = {
    theme: {
        color?: string;
        breadcrumb?: boolean;
    };
    setTheme: ({ color, breadcrumb }: { color: string, breadcrumb: boolean }) => void;
}