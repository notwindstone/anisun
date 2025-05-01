import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import AnimatedGradientText from "@/components/AnimatedGradientText/AnimatedGradientText";

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
                    <div className="w-8 h-8 rounded-full bg-rose-200" />
                    <AnimatedGradientText>
                        anisun
                    </AnimatedGradientText>
                </div>
                {JSON.stringify(config)}
            </div>
        </>
    );
}