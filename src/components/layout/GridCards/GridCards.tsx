export default function GridCards({
    children,
    disablePadding,
}: {
    children: React.ReactNode;
    disablePadding?: boolean;
}) {
    return (
        <div className={`${disablePadding ? "" : "p-4"} flex flex-wrap justify-start gap-4 w-full h-fit`}>
            {children}
        </div>
    );
}
