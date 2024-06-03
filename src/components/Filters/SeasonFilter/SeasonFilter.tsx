import {Group, MultiSelect, NumberInput, RangeSlider, Slider, Switch} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './SeasonFilter.module.css';

const FIRST_ANIME_AIRED_ON = 1917;
const EARLIER_YEAR = 2000;
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
    const currentYear = new Date().getFullYear();
    const { theme } = useCustomTheme();

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
            return setYearStart(EARLIER_YEAR);
        }

        return setYearStart(FIRST_ANIME_AIRED_ON);
    }

    return (
        <>
            <Group>
                <Switch
                    label="Выбрать промежутком"
                    color={theme.color}
                    checked={yearsRanged}
                    onChange={toggleYearsRanged}
                />
                <Switch
                    label={`Начать промежуток с ${EARLIER_YEAR} года`}
                    color={theme.color}
                    checked={yearStart === EARLIER_YEAR}
                    onChange={toggleStartYear}
                />
            </Group>
            {
                yearsRanged ? (
                    <>
                        <RangeSlider
                            minRange={1}
                            marks={yearStart === FIRST_ANIME_AIRED_ON ? BIG_RANGE_MARKS : SMALL_RANGE_MARKS}
                            color={theme.color}
                            value={rangedYears}
                            onChange={setRangedYears}
                            min={yearStart}
                            max={currentYear}
                        />
                        <NumberInput
                            value={rangedYears[0]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderFirst"
                            })}
                            placeholder="От"
                            min={yearStart}
                            max={currentYear}
                        />
                        <NumberInput
                            value={rangedYears[1]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderSecond"
                            })}
                            placeholder="До"
                            min={yearStart}
                            max={currentYear}
                        />
                    </>
                ) : (
                    <>
                        <Slider
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
                        <NumberInput
                            value={year}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "defaultSlider"
                            })}
                            placeholder="Год"
                            min={yearStart}
                            max={currentYear}
                        />
                    </>
                )
            }
            {
                !yearsRanged && (
                    <MultiSelect
                        placeholder="Сезон"
                        value={seasons}
                        onChange={setSeasons}
                        data={variables.filters.season}
                    />
                )
            }
        </>
    );
});