import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconTrendingUp} from "@tabler/icons-react";
import {variables} from "@/configs/variables";

const LABEL = "Популярное"
const REDIRECT_LINK = '/trending'

export default function SideBarTrending() {
    return (
        <SideBarButton
            icon={<IconTrendingUp {...variables.iconProps} />}
            label={LABEL}
            redirectLink={REDIRECT_LINK}
        />
    )
}