import {useMediaQuery} from "@mantine/hooks";
import {em} from "@mantine/core";

export default function useMobileScreen() {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const isTablet = useMediaQuery(`(max-width: ${em(1024)})`);

    return { isMobile: isMobile, isTablet: isTablet };
}