import {IconShare3} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useClipboard} from "@mantine/hooks";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";

export default function AnimeInfoCopyLink() {
    const pathname = usePathname();
    const clipboard = useClipboard({ timeout: 1000 });
    const translate = useTranslations('Translations');

    function copyLink() {
        clipboard.copy(`https://animeth.vercel.app${pathname}`);
    }

    return (
        <DecoratedButton
            leftSection={!clipboard.copied && <IconShare3 size={18} stroke={1.5} />}
            onClick={copyLink}
        >
            {
                clipboard.copied
                    ? translate('common__copied-label')
                    : translate('common__share-label')
            }
        </DecoratedButton>
    );
}