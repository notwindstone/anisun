import {Group, MultiSelect, NumberInput, RangeSlider, rem, Slider, Stack, Switch, Text} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './SeasonFilter.module.css';
import classesSelect from '@/components/Filters/FiltersSelect.module.css';
import classesSwitch from '@/components/Filters/FiltersSwitch.module.css';
import classesNumberInput from '@/components/Filters/FiltersNumberInput.module.css';
import {useDisclosure, useFocusWithin} from "@mantine/hooks";
import calculateColor from "@/utils/Misc/calculateColor";
import {useTranslations} from "next-intl";

const FIRST_ANIME_AIRED_ON = 1917;
const LATER_YEAR = 2000;
const BIG_RANGE_MARKS = [
    { value: 1920, label: '1920' },
    { value: 1940, label: '1940' },
    { value: 1960, label: '1960' },
    { value: 1980, label: '1980' },
    { value: 2000, label: '2000' },
    { value: 2020, label: '2020' },
];
const SMALL_RANGE_MARKS = [
    { value: 2000, label: '2000' },
    { value: 2010, label: '2010' },
    { value: 2020, label: '2020' },
];

function SeasonNumberInput({
    color,
    inputYear,
    onChange,
    yearStart,
    currentYear,
    placeholder,
}: {
    color: string | undefined;
    inputYear: number | undefined;
    onChange: (value: string | number) => void;
    yearStart: number;
    currentYear: number;
    placeholder: string;
}) {
    const { ref, focused } = useFocusWithin();

    return (
        <NumberInput
            styles={{
                input: {
                    borderColor: focused ? color : undefined
                }
            }}
            ref={ref}
            classNames={classesNumberInput}
            value={inputYear}
            onChange={onChange}
            placeholder={placeholder}
            min={yearStart}
            max={currentYear}
        />
    );
}

export default memo(function SeasonFilter({
    year,
    setYear,
    rangedYears,
    setRangedYears,
    yearStart,
    setYearStart,
    yearsRanged,
    toggleYearsRanged,
    seasons,
    setSeasons,
}: {
    year: number,
    setYear: Dispatch<SetStateAction<number>>,
    rangedYears: [number, number],
    setRangedYears: Dispatch<SetStateAction<[number, number]>>,
    yearStart: number,
    setYearStart: Dispatch<SetStateAction<number>>,
    yearsRanged: boolean,
    toggleYearsRanged: () => void,
    seasons: string[],
    setSeasons: Dispatch<SetStateAction<string[]>>
}) {
    const translate = useTranslations('Translations');
    const currentYear = new Date().getFullYear();
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);

    function setYearWithChecks({ year, toValue }: { year: number | string, toValue: string }) {
        const parsedYear = parseInt(year.toString());
        let validYear: number;

        if (parsedYear > currentYear) {
            validYear = currentYear;
        } else if (parsedYear < yearStart) {
            validYear = yearStart;
        } else {
            validYear = parsedYear;
        }

        switch (toValue) {
            case "defaultSlider":
                return setYear(validYear);
            case "rangedSliderFirst":
                return setRangedYears([validYear, rangedYears[1]]);
            case "rangedSliderSecond":
                return setRangedYears([rangedYears[0], validYear]);
        }
    }

    function toggleStartYear() {
        if (yearStart === FIRST_ANIME_AIRED_ON) {
            return setYearStart(LATER_YEAR);
        }

        return setYearStart(FIRST_ANIME_AIRED_ON);
    }

    const seasonsData = variables.filters.season.map((season) => {
        return {
            label: translate(season.label),
            value: season.value
        };
    });

    return (
        <>
            <Group>
                <Switch
                    classNames={classesSwitch}
                    label={translate('component__season-filter__select-ranged-label')}
                    color={theme.color}
                    checked={yearsRanged}
                    onChange={toggleYearsRanged}
                />
                <Switch
                    classNames={classesSwitch}
                    label={translate('component__season-filter__start-from-later-label', { LATER_YEAR })}
                    color={theme.color}
                    checked={yearStart === LATER_YEAR}
                    onChange={toggleStartYear}
                />
            </Group>
            {
                yearsRanged ? (
                    <>
                        <Stack gap={rem(4)}>
                            <Text size="sm">
                                {translate('component__season-filter__years-label')}
                            </Text>
                            <RangeSlider
                                pb={rem(24)}
                                minRange={1}
                                marks={yearStart === FIRST_ANIME_AIRED_ON ? BIG_RANGE_MARKS : SMALL_RANGE_MARKS}
                                color={theme.color}
                                value={rangedYears}
                                onChange={setRangedYears}
                                min={yearStart}
                                max={currentYear}
                            />
                        </Stack>
                        <SeasonNumberInput
                            color={theme.color}
                            inputYear={rangedYears[0]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderFirst"
                            })}
                            yearStart={yearStart}
                            currentYear={currentYear}
                            placeholder={translate('component__season-filter__from-label')}
                        />
                        <SeasonNumberInput
                            color={theme.color}
                            inputYear={rangedYears[1]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderSecond"
                            })}
                            yearStart={yearStart}
                            currentYear={currentYear}
                            placeholder={translate('component__season-filter__to-label')}
                        />
                    </>
                ) : (
                    <>
                        <Stack gap={rem(4)}>
                            <Text size="sm">
                                {translate('component__season-filter__year-label')}
                            </Text>
                            <Slider
                                pb={rem(24)}
                                marks={yearStart === FIRST_ANIME_AIRED_ON ? BIG_RANGE_MARKS : SMALL_RANGE_MARKS}
                                classNames={{
                                    bar: classes.bar
                                }}
                                color={theme.color}
                                value={year}
                                onChange={setYear}
                                min={yearStart}
                                max={currentYear}
                            />
                        </Stack>
                        <SeasonNumberInput
                            color={theme.color}
                            inputYear={year || undefined}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "defaultSlider"
                            })}
                            yearStart={yearStart}
                            currentYear={currentYear}
                            placeholder={translate('component__season-filter__year-label')}
                        />
                    </>
                )
            }
            {
                !yearsRanged && (
                    <MultiSelect
                        onDropdownOpen={open}
                        onDropdownClose={close}
                        styles={{
                            input: {
                                borderColor: focused ? color : undefined
                            }
                        }}
                        classNames={classesSelect}
                        placeholder={translate('component__season-filter__season-label')}
                        value={seasons}
                        onChange={setSeasons}
                        data={seasonsData}
                    />
                )
            }
        </>
    );
});