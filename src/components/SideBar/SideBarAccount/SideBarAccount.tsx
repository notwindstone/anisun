import SideBarAccountTarget from "@/components/SideBar/SideBarAccount/SideBarAccountTarget/SideBarAccountTarget";
import SideBarAccountDropdown from "@/components/SideBar/SideBarAccount/SideBarAccountDropdown/SideBarAccountDropdown";
import React, {useState} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";

export default function SideBarAccount() {
    const [expanded, setExpanded] = useState(false)

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarPopover>
                <SideBarAccountTarget />
                <SideBarAccountDropdown />
            </SideBarPopover>
        </SideBarPopoverContext.Provider>
    )
}