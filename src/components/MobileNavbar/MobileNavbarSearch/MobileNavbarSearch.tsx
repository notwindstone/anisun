import {IconSearch} from "@tabler/icons-react";
import {Center, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import '@/components/MobileNavbar/MobileNavbar.global.css';
import NProgress from "nprogress";
import {usePathname, useRouter} from "next/navigation";

export default function MobileNavbarSearch() {
    const router = useRouter();
    const pathname = usePathname();

    function redirectUser() {
        NProgress.start();
        router.push("/titles");
        NProgress.done();
    }

    return (
        <>
            <Center flex={1}>
                <UnstyledButton onClick={redirectUser} className={classes.buttonWrapper}>
                    <ThemeIcon
                        className={`${classes.button} ${pathname === "/titles" && classes.activeButton}`}
                    >
                        <IconSearch className={classes.icon} stroke={1.5} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Поиск</Text>
                </UnstyledButton>
            </Center>
        </>
    );
}