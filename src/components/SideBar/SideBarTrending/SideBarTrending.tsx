import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconTrendingUp} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import {useTranslations} from "next-intl";

const REDIRECT_LINK = '/trending';

export default function SideBarTrending() {
    const translate = useTranslations('Translations');
    const trendingLabel = translate('trending-placeholder');

    return (
        <SideBarButton
            icon={<IconTrendingUp {...variables.iconProps} />}
            label={trendingLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}