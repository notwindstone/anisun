import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function Sidebar({
    config,
}: {
    config: SafeConfigType;
}) {
    const { colors: { accent } } = config;
    const gradientFrom = parseTailwindColor({
        color: accent,
        step: 600,
    });
    const gradientTo = parseTailwindColor({
        color: accent,
        step: 400,
    });

    return (
        <>
            <div
                className="w-full h-full"
            >
                <div className="flex select-none">
                    <div className="w-8 h-8 rounded-full bg-amber-200" />
                    <div
                        className={`animate-gradient text-2xl font-bold text-transparent leading-none`}
                        style={{
                            backgroundImage: `linear-gradient(to right,${gradientFrom},${gradientTo},${gradientFrom})`,
                            backgroundClip: "text",
                            backgroundSize: "200% auto",
                        }}
                    >
                        anisun.
                    </div>
                </div>
            </div>
        </>
    );
}