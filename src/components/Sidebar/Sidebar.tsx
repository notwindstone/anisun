import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";

export default function Sidebar({
    config,
}: {
    config: SafeConfigType;
}) {
    return (
        <>
            <div
                className="w-full h-full"
            >
                <div className="flex select-none">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-rose-200" />

                </div>
                {JSON.stringify(config)}
            </div>
        </>
    );
}