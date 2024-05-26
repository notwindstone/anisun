import {IconShare3} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useClipboard} from "@mantine/hooks";
import {usePathname} from "next/navigation";

export default function AnimeInfoCopyLink() {
    const pathname = usePathname();
    const clipboard = useClipboard({ timeout: 1000 });

    function copyLink() {
        clipboard.copy(`https://animeth.vercel.app${pathname}`);
    }

    return (
        <DecoratedButton
            leftSection={!clipboard.copied && <IconShare3 />}
            onClick={copyLink}
        >
            {
                clipboard.copied ? "Скопировано" : "Поделиться"
            }
        </DecoratedButton>
    );
}