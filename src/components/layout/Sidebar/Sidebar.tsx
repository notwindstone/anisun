import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import Button from "@/components/base/Button/Button";

export default function Sidebar({
    config,
}: {
    config: SafeConfigType;
}) {
    return (
        <>
            <Button label={""} custom={{ style: "transparent" }}>
                asdf
            </Button>
            {JSON.stringify(config)}
        </>
    );
}