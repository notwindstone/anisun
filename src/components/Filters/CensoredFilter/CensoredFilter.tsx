import {Switch} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {memo} from "react";
import classes from '@/components/Filters/FiltersSwitch.module.css';
import {useTranslations} from "next-intl";

export default memo(function CensoredFilter({
    censored,
    toggleCensored
}: {
    censored: boolean,
    toggleCensored: () => void
}) {
    const { theme } = useCustomTheme();
    const translate = useTranslations('Translations');

    return (
        <>
            <Switch
                classNames={classes}
                label={translate('component__censored-filter__censure-label')}
                color={theme.color}
                checked={censored}
                onChange={toggleCensored}
            />
        </>
    );
});