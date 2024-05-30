'use client';

import {useEffect, useState} from 'react';
import {
    Autocomplete,
    AutocompleteProps,
    CloseButton,
    ComboboxItem,
    Flex, FloatingPosition,
    Image, MantineSize,
    OptionsFilter,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {useDebouncedValue, useDisclosure, useViewportSize} from '@mantine/hooks';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import NextImage from 'next/image';
import {client} from "@/lib/shikimori/client";
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {AnimeKindEnum} from "@/types/Shikimori/Responses/Enums/AnimeKind.enum";
import {AnimeStatus} from "kodikwrapper";
import {variables} from "@/configs/variables";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {SearchBarDataType} from "@/types/SearchBar/SearchBarData.type";
import useCustomTheme from "@/hooks/useCustomTheme";
import Link from "next/link";

const NOTHING = {
    label: ' ',
    value: 'nothing',
    disabled: true
};
const FETCHING = {
    label: ' ',
    value: 'fetching',
    disabled: true
};
const NO_VALUE = {
    label: ' ',
    value: 'noValue',
    disabled: true
};

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название аниме" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает так, как мне нужно, поэтому всё отлично
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    const nonTranslatedKind: AnimeKindEnum | string = optionData[3];
    const nonTranslatedStatus: AnimeStatus | string = optionData[4];

    const posterSourceURL = optionData[1];
    const russianName = optionData[2];
    const kind = translateAnimeKind(nonTranslatedKind);
    const status = translateAnimeStatus({ sortingType: nonTranslatedStatus, singular: true });
    const englishName = optionData[5];

    switch (option.value) {
        case 'nothing':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="md" src={searchAutocomplete.nothing.image} />
                    <Title order={3}>{searchAutocomplete.nothing.label}</Title>
                </Stack>
            );
        case 'noValue':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="md" src={searchAutocomplete.noValue.image} />
                    <Title order={3}>{searchAutocomplete.noValue.label}</Title>
                </Stack>
            );
        case 'fetching':
            return (
                <Flex align="center" gap="md">
                    <div>
                        <Skeleton width={96} height={128} radius="md" />
                    </div>
                    <div>
                        <Skeleton height={24} width={208} radius="xl" mb="xs" />
                        <Skeleton height={24} width={208} radius="xl" mb="xs" />
                        <Skeleton height={24} width={208} radius="xl" />
                    </div>
                </Flex>
            );
    }

    return (
        <Flex
            component={Link}
            className={classes.link}
            href={`/titles/${optionData[0]}`}
            align="center"
            gap="md"
        >
            <div>
                <Image
                    alt="Anime poster"
                    src={posterSourceURL}
                    placeholder="blur"
                    blurDataURL={variables.imagePlaceholder}
                    width={96}
                    height={128}
                    component={NextImage}
                    className={classes.poster}
                    radius="md"
                />
            </div>
            <div>
                <Title
                    className={classes.text}
                    lineClamp={2}
                    order={3}
                >
                    {russianName}
                </Title>
                <Text
                    className={classes.text}
                    lineClamp={2}
                    size="lg"
                    opacity={0.8}
                >
                    {kind}
                </Text>
                <Text
                    className={classes.text}
                    lineClamp={2}
                    size="md"
                    opacity={0.5}
                >
                    {status}{englishName ? (`, ${englishName}`) : []}
                </Text>
            </div>
        </Flex>
    );
};

export default function SearchBar({position, size}: { position?: FloatingPosition, size: MantineSize }) {
    const {theme} = useCustomTheme();
    const {height} = useViewportSize();
    const shikimori = client();
    useRouter();
    const [input, setInput] = useState('');
    const [search] = useDebouncedValue(input, 300);
    const [focused, {open, close}] = useDisclosure(false);
    const color = theme.color;
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    const calculatedColor = isMantineColor ? mantineColor : color;

    const [
        titles,
        setTitles
    ] = useState<SearchBarDataType>([NO_VALUE]);

    const { data, isFetching } = useQuery({
        queryKey: ['titles', search],
        queryFn: async () => fetchTitles(search),
    });

    async function fetchTitles(keyInput: string) {
        const isOnlyWhiteSpace = !keyInput.replace(/\s/g, '').length;

        if (isOnlyWhiteSpace) {
            return [NO_VALUE];
        }

        const searchList = (await shikimori.animes.list({
            search: keyInput,
            limit: 10,
            filter: [
                "name",
                "url",
                "poster { id originalUrl mainUrl }",
                "russian",
                "kind",
                "status"
            ]
        })).animes;

        if (searchList.length < 1) {
            return [NOTHING];
        }

        return searchList.map((title: AnimeType) => {
            const titleCode = title.url.replace('https://shikimori.one/animes/', '');
            const posterSourceURL = title.poster?.mainUrl ?? '/missing-image.png';
            const originalName = title.name;
            const russianName = title.russian ?? originalName;
            const animeKind = title.kind;
            const animeStatus = title.status;

            return (
                {
                    value: `${titleCode}--${posterSourceURL}--${russianName}--${animeKind}--${animeStatus}--${originalName}`,
                    label: `${russianName} / ${originalName}`,
                }
            );
        });
    }

    useEffect(() => {
        if (!data || isFetching) {
            return setTitles([FETCHING]);
        }

        return setTitles(data);
    }, [data, isFetching]);

    return (
        <>
            <Autocomplete
                comboboxProps={{ transitionProps: { transition: "fade-up" }, position: position ?? "top" }}
                classNames={{
                    dropdown: classes.dropdown,
                    options: classes.options,
                    option: classes.option,
                }}
                styles={{
                    input: {
                        borderColor: focused ? calculatedColor : "var(--mantine-color-default-border)"
                    }
                }}
                variant="default"
                maxDropdownHeight={height - height / 2}
                data={titles}
                onChange={(event) => {
                    setInput(event);
                }}
                placeholder="Поиск"
                leftSection={
                    <IconSearch size={24} />
                }
                value={input}
                rightSectionPointerEvents="auto"
                rightSection={
                    search
                    && <CloseButton onClick={() => {
                        setInput('');
                    }} />
                }
                onDropdownOpen={open}
                onDropdownClose={close}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
                size={size}
            />
        </>
    );
}