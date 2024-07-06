import classes from "@/components/Recommendations/Recommendations.module.css";
import {IconCheck, IconShare3} from "@tabler/icons-react";
import {UnstyledButton} from "@mantine/core";
import useRipple from "use-ripple-hook";
import {variables} from "@/configs/variables";
import {useClipboard} from "@mantine/hooks";

const ICON_STYLES = {
    size: 20,
    stroke: 1.5,
};

export default function RecommendationsShareButton({ url }: { url: string } ) {
    const [ripple, event] = useRipple(variables.rippleColor);
    const clipboard = useClipboard({ timeout: 1000 });

    function copyLink() {
        clipboard.copy(`https://anisun.vercel.app/titles/${url.replace('/animes/', '')}`);
    }

    return (
        <UnstyledButton
            className={classes.menuButton}
            ref={ripple}
            onPointerDown={event}
            onClick={copyLink}
        >
            {
                clipboard.copied ? (
                    <IconCheck {...ICON_STYLES} />
                ) : (
                    <IconShare3 {...ICON_STYLES} />
                )
            }
        </UnstyledButton>
    );
}