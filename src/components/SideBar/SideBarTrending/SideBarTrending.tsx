import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconTrendingUp} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import {useTranslations} from "next-intl";

export default function SideBarTrending() {
    const translate = useTranslations('Translations');
    const trendingLabel = translate('common__trending-placeholder');

    const info = useTranslations('Info');
    const locale = info('locale');
    const REDIRECT_LINK = `/${locale}/trending`;

    return (
        <SideBarButton
            icon={<IconTrendingUp {...variables.iconProps} />}
            label={trendingLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}