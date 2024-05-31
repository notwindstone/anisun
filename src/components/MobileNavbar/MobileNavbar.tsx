'use client';

import {useDisclosure, useHeadroom} from "@mantine/hooks";
import {Flex, rem} from "@mantine/core";
import classes from './MobileNavbar.module.css';
import MobileModalNavigation from "@/components/MobileNavbar/MobileNavbarNavigation/MobileNavbarNavigation";
import MobileNavbarSearch from "@/components/MobileNavbar/MobileNavbarSearch/MobileNavbarSearch";
import MobileModalMenu from "@/components/MobileNavbar/MobileNavbarMenu/MobileNavbarMenu";
import useMobileScreen from "@/hooks/useMobileScreen";
import {MobileNavbarModalsContext} from "@/utils/Contexts/Contexts";
import {SignIn, SignUp, UserProfile, useUser} from "@clerk/nextjs";
import AccountModal from "@/components/AccountModal/AccountModal";
import React, {useEffect} from "react";
import NProgress from "nprogress";
import './MobileNavbar.global.css';

export default function MobileNavbar() {
    const { isMobile } = useMobileScreen();
    const pinned = useHeadroom({ fixedAt: 120 });
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
    const [signInOpened, { open: openSignIn, close: closeSignIn }] = useDisclosure(false);
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }

        closeSignUp();
        closeSignIn();
        NProgress.start();
        NProgress.done();
        // eslint-disable-next-line
    }, [user]);

    const settingsModal = (
        <AccountModal
            mounted={settingsOpened}
            func={closeSettings}
        >
            <UserProfile />
        </AccountModal>
    );

    const signInModal = (
        <AccountModal
            mounted={signInOpened}
            func={closeSignIn}
        >
            <SignIn routing="virtual" />
        </AccountModal>
    );

    const signUpModal = (
        <AccountModal
            mounted={signUpOpened}
            func={closeSignUp}
        >
            <SignUp routing="virtual" />
        </AccountModal>
    );

    return isMobile && (
        <MobileNavbarModalsContext.Provider value={{
            settingsOpened,
            signInOpened,
            signUpOpened,
            openSettings,
            openSignIn,
            openSignUp,
            closeSettings,
            closeSignIn,
            closeSignUp,
        }}>
            {settingsModal}
            {signInModal}
            {signUpModal}
            <div
                className={classes.wrapper}
                style={{transform: `translate3d(0, ${pinned ? 0 : rem(128)}, 0)`}}
            >
                <Flex
                    className={classes.root}
                    justify="space-between"
                    align="center"
                >
                    <MobileModalNavigation/>
                    <MobileNavbarSearch/>
                    <MobileModalMenu/>
                </Flex>
            </div>
        </MobileNavbarModalsContext.Provider>
    );
}