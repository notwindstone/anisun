import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconHome} from "@tabler/icons-react";
import {variables} from "@/configs/variables";

const LABEL = "Главная"
const REDIRECT_LINK = '/'

export default function SideBarHome() {
    return (
        <SideBarButton
            icon={<IconHome {...variables.iconProps} />}
            label={LABEL}
            redirectLink={REDIRECT_LINK}
        />
    )
}