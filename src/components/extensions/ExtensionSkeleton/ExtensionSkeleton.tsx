export default function ExtensionSkeleton({
    title,
    description,
    shouldPulse,
    children,
}: {
    title: string;
    description: string;
    shouldPulse?: boolean;
    children?: React.ReactNode;
}) {
    return (
        <div
            className={`flex flex-col gap-4 items-center justify-center h-full w-full bg-neutral-200 dark:bg-neutral-900 ${shouldPulse ? "animate-pulse" : ""}`}
        >
            <p className="leading-none text-xl sm:text-4xl font-semibold">
                {title}
            </p>
            <p className="leading-none opacity-60 text-sm sm:text-lg px-2 text-center">
                {description}
            </p>
            {children}
        </div>
    );
}
