import DOMPurify from "isomorphic-dompurify";
import classes from "@/components/AnimeInfo/AnimeInfo.module.css";
import {DefaultMantineColor} from "@mantine/core";

export default function sanitizeHTML({ descriptionHtml, color }: { descriptionHtml: string; color: DefaultMantineColor | `#${string}` | undefined }) {
    DOMPurify.addHook('afterSanitizeElements', function (node) {
        if (!node.tagName) {
            return;
        }

        if (node.tagName.toLowerCase() === 'a') {
            node.setAttribute('style', `color: ${color}`);
            node.setAttribute('class', classes.defaultAnchor);
        }
    });

    return DOMPurify.sanitize(descriptionHtml);
}