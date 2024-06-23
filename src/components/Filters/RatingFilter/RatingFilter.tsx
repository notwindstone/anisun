import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import calculateColor from "@/utils/Misc/calculateColor";
import {useDisclosure} from "@mantine/hooks";
import {useTranslations} from "next-intl";

export default memo(function RatingFilter({
    ratings,
    setRatings
}: {
    ratings: string[] | undefined,
    setRatings: Dispatch<SetStateAction<string[] | undefined>>
}) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);
    const ratingData = variables.filters.rating.map((rating) => {
        return {
            label: translate(rating.label),
            value: rating.value
        };
    });

    return (
        <>
            <MultiSelect

                onDropdownOpen={open}
                onDropdownClose={close}
                styles={{
                    input: {
                        borderColor: focused ? color : undefined
                    }
                }}
                classNames={classes}
                value={ratings}
                onChange={(rating) => setRatings(rating)}
                placeholder={translate('component__rating-filter__age-rating-label')}
                data={ratingData}
            />
        </>
    );
});