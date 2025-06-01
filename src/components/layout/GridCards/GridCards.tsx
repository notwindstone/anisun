export default function GridCards({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-4 flex flex-wrap justify-center gap-4 w-full h-fit">
            {children}
        </div>
    );
}
