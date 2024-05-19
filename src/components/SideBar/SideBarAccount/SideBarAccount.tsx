import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import SideBarAccountTarget from "@/components/SideBar/SideBarAccount/SideBarAccountTarget/SideBarAccountTarget";
import SideBarAccountDropdown from "@/components/SideBar/SideBarAccount/SideBarAccountDropdown/SideBarAccountDropdown";
import {useState} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";

export default function SideBarAccount() {
    const [expanded, setExpanded] = useState(false)

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarPopover
                button={<SideBarAccountTarget />}
                dropdown={<SideBarAccountDropdown />}
            />
        </SideBarPopoverContext.Provider>
    )
}