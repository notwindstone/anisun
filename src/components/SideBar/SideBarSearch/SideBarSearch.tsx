import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import SideBarSettingsDropdown
    from "@/components/SideBar/SideBarSettings/SideBarSettingsDropdown/SideBarSettingsDropdown";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import React, {useState} from "react";
import SideBarSearchTarget from "@/components/SideBar/SideBarSearch/SideBarSearchTarget/SideBarSearchTarget";

export default function SideBarSearch() {
    const [expanded, setExpanded] = useState(false)

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarPopover>
                <SideBarSearchTarget />
                <SideBarSettingsDropdown />
            </SideBarPopover>
        </SideBarPopoverContext.Provider>
    )
}