export default function Divider({
    classNames,
}: {
    classNames?: string;
}) {
    return (
        <div className={`opacity-10 w-full h-0.5 bg-black dark:bg-white transition ${classNames ?? ""}`} />
    );
}
