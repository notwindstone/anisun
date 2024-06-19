import SideBarAccountTarget from "@/components/SideBar/SideBarAccount/SideBarAccountTarget/SideBarAccountTarget";
import SideBarAccountDropdown from "@/components/SideBar/SideBarAccount/SideBarAccountDropdown/SideBarAccountDropdown";
import React, {useEffect, useState} from "react";
import {SideBarAccountPopoverContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import {useDisclosure} from "@mantine/hooks";
import AccountModal from "@/components/AccountModal/AccountModal";
import {SignIn, SignUp, UserProfile, useUser} from "@clerk/nextjs";
import NProgress from "nprogress";

export default function SideBarAccount() {
    const { user } = useUser();
    const [expanded, setExpanded] = useState(false);
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
    const [signInOpened, { open: openSignIn, close: closeSignIn }] = useDisclosure(false);
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);

    const settingsModal = (
        <AccountModal
            mounted={settingsOpened}
            func={closeSettings}
        >
            <UserProfile routing="virtual" />
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

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarAccountPopoverContext.Provider
                value={{
                    settingsOpened,
                    signInOpened,
                    signUpOpened,
                    openSettings,
                    openSignIn,
                    openSignUp,
                    closeSettings,
                    closeSignIn,
                    closeSignUp,
                }}
            >
                {settingsModal}
                {signInModal}
                {signUpModal}
                <SideBarPopover>
                    <SideBarAccountTarget />
                    <SideBarAccountDropdown />
                </SideBarPopover>
            </SideBarAccountPopoverContext.Provider>
        </SideBarPopoverContext.Provider>
    );
}