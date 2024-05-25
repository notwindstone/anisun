import {useMediaQuery} from "@mantine/hooks";
import {em} from "@mantine/core";

export default function useMobileScreen() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return { isMobile: isMobile };
}