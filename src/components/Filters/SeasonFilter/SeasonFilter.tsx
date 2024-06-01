import {MultiSelect, NumberInput, RangeSlider, Slider, Switch} from "@mantine/core";
import {useState} from "react";
import {variables} from "@/configs/variables";
import {useDisclosure} from "@mantine/hooks";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './SeasonFilter.module.css';

const FIRST_ANIME_AIRED_ON = 1917;

export default function SeasonFilter() {
    const currentYear = new Date().getFullYear();
    const [rangedYears, setRangedYears] = useState<[number, number]>([FIRST_ANIME_AIRED_ON, currentYear]);
    const [year, setYear] = useState(currentYear);
    const [seasons, setSeasons] = useState<string[]>([]);
    const [isYearsRanged, { toggle }] = useDisclosure(false);
    const { theme } = useCustomTheme();

    function setYearWithChecks({ year, toValue }: { year: number | string, toValue: string }) {
        const parsedYear = parseInt(year.toString());
        let validYear: number;

        if (parsedYear > currentYear) {
            validYear = currentYear;
        } else if (parsedYear < FIRST_ANIME_AIRED_ON) {
            validYear = FIRST_ANIME_AIRED_ON;
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

    return (
        <>
            <Switch
                label="Выбрать промежутком"
                color={theme.color}
                checked={isYearsRanged}
                onChange={toggle}
            />
            {
                isYearsRanged ? (
                    <>
                        <RangeSlider
                            marks={[
                                { value: 1920, label: '1920' },
                                { value: 1930, label: '1930' },
                                { value: 1940, label: '1940' },
                                { value: 1950, label: '1950' },
                                { value: 1960, label: '1960' },
                                { value: 1970, label: '1970' },
                                { value: 1980, label: '1980' },
                                { value: 1990, label: '1990' },
                                { value: 2000, label: '2000' },
                                { value: 2010, label: '2010' },
                                { value: 2020, label: '2020' },
                            ]}
                            color={theme.color}
                            value={rangedYears}
                            onChange={setRangedYears}
                            min={FIRST_ANIME_AIRED_ON}
                            max={currentYear}
                        />
                        <NumberInput
                            value={rangedYears[0]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderFirst"
                            })}
                            placeholder="От"
                            min={FIRST_ANIME_AIRED_ON}
                            max={currentYear}
                        />
                        <NumberInput
                            value={rangedYears[1]}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "rangedSliderSecond"
                            })}
                            placeholder="До"
                            min={FIRST_ANIME_AIRED_ON}
                            max={currentYear}
                        />
                    </>
                ) : (
                    <>
                        <Slider
                            marks={[
                                { value: 1920, label: '1920' },
                                { value: 1930, label: '1930' },
                                { value: 1940, label: '1940' },
                                { value: 1950, label: '1950' },
                                { value: 1960, label: '1960' },
                                { value: 1970, label: '1970' },
                                { value: 1980, label: '1980' },
                                { value: 1990, label: '1990' },
                                { value: 2000, label: '2000' },
                                { value: 2010, label: '2010' },
                                { value: 2020, label: '2020' },
                            ]}
                            classNames={{
                                bar: classes.bar
                            }}
                            color={theme.color}
                            value={year}
                            onChange={setYear}
                            min={FIRST_ANIME_AIRED_ON}
                            max={currentYear}
                        />
                        <NumberInput
                            value={year}
                            onChange={(year) => setYearWithChecks({
                                year: year,
                                toValue: "defaultSlider"
                            })}
                            placeholder="Год"
                            min={FIRST_ANIME_AIRED_ON}
                            max={currentYear}
                        />
                    </>
                )
            }
            <MultiSelect
                value={seasons}
                onChange={setSeasons}
                data={variables.filters.season}
            />
        </>
    );
}