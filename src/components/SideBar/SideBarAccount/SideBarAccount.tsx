import SideBarAccountTarget from "@/components/SideBar/SideBarAccount/SideBarAccountTarget/SideBarAccountTarget";
import SideBarAccountDropdown from "@/components/SideBar/SideBarAccount/SideBarAccountDropdown/SideBarAccountDropdown";
import React, {useState} from "react";
import {SideBarAccountPopoverContext, SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import {useDisclosure} from "@mantine/hooks";

export default function SideBarAccount() {
    const [expanded, setExpanded] = useState(false)
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
    const [signInOpened, { open: openSignIn, close: closeSignIn }] = useDisclosure(false);
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);

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
                <SideBarPopover>
                    <SideBarAccountTarget />
                    <SideBarAccountDropdown />
                </SideBarPopover>
            </SideBarAccountPopoverContext.Provider>
        </SideBarPopoverContext.Provider>
    )
}