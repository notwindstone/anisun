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
import useMobileScreen from "@/hooks/useMobileScreen";
import calculateColor from "@/utils/Misc/calculateColor";

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
                        <Skeleton className={classes.poster} height={128} radius="md" />
                    </div>
                    <div>
                        <Skeleton className={classes.textSkeleton} height={24} width={128} radius="xl" mb="xs" />
                        <Skeleton className={classes.textSkeleton} height={24} width={128} radius="xl" mb="xs" />
                        <Skeleton className={classes.textSkeleton} height={24} width={128} radius="xl" />
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
                    className={`${classes.text} ${classes.title}`}
                    lineClamp={2}
                    order={3}
                >
                    {englishName}
                </Title>
                <Text
                    className={`${classes.text} ${classes.subtitle}`}
                    lineClamp={2}
                    size="lg"
                    opacity={0.8}
                >
                    {kind}
                </Text>
                <Text
                    className={`${classes.text} ${classes.description}`}
                    lineClamp={2}
                    size="md"
                    opacity={0.5}
                >
                    {status}{russianName ? (`, ${russianName}`) : []}
                </Text>
            </div>
        </Flex>
    );
};

export default function SearchBar({position, size}: { position?: FloatingPosition, size: MantineSize }) {
    const {theme} = useCustomTheme();
    const {height} = useViewportSize();
    const { isMobile } = useMobileScreen();
    const shikimori = client();
    const [input, setInput] = useState('');
    const [search] = useDebouncedValue(input, 300);
    const [focused, {open, close}] = useDisclosure(false);
    const color = calculateColor(theme.color);

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
                    input: classes.input,
                    dropdown: classes.dropdown,
                    options: classes.options,
                    option: classes.option,
                }}
                styles={{
                    input: {
                        borderColor: focused ? color : "#0000"
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
                    <IconSearch size={24} stroke={1.5} />
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
                size={isMobile ? "md" : size}
            />
        </>
    );
}