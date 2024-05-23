'use client';

import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
    Autocomplete,
    AutocompleteProps,
    CloseButton,
    ComboboxItem,
    Flex,
    Image,
    OptionsFilter,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {useDebouncedValue} from '@mantine/hooks';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import NProgress from 'nprogress';
import NextImage from 'next/image'
import {client} from "@/lib/shikimori/client";
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {AnimeKindEnum} from "@/types/Shikimori/Responses/Enums/AnimeKind.enum";
import {AnimeStatus} from "kodikwrapper";
import {variables} from "@/configs/variables";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название аниме" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает так, как мне нужно, поэтому всё отлично
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    const nonTranslatedKind: AnimeKindEnum | string = optionData[3]
    const nonTranslatedStatus: AnimeStatus | string = optionData[4]

    const posterSourceURL = optionData[1]
    const russianName = optionData[2]
    let kind = translateAnimeKind(nonTranslatedKind)
    let status = translateAnimeStatus(nonTranslatedStatus)
    const englishName = optionData[5]

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
            )
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
            )
    }

    return (
        <Flex align="center" gap="md">
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
                <Title lineClamp={2} order={3}>{russianName}</Title>
                <Text lineClamp={2} size="lg" opacity={0.8}>{kind}</Text>
                <Text lineClamp={2} size="md" opacity={0.5}>{status}{englishName ? `, ${englishName}` : []}</Text>
            </div>
        </Flex>
    );
};

export default function SearchBar({ close }: { close?: () => void }) {
    const shikimori = client();
    const router = useRouter();
    const [input, setInput] = useState('')
    const [search] = useDebouncedValue(input, 300);

    const [
        titles,
        setTitles
    ] = useState<SearchBarDataType>([{
        label: ' ',
        value: 'noValue',
        disabled: true
    }]);

    const { data, isFetching } = useQuery({
        queryKey: ['titles', search],
        queryFn: async () => fetchTitles(search),
    });

    async function fetchTitles(keyInput: string) {
        const isOnlyWhiteSpace = !keyInput.replace(/\s/g, '').length

        if (isOnlyWhiteSpace) {
            return [{label: ' ', value: 'noValue', disabled: true}]
        }

        const searchList = (await shikimori.animes.list({
            search: keyInput,
            limit: 10
        })).animes

        if (searchList.length < 1) {
            return [{label: ' ', value: 'nothing', disabled: true}];
        }

        return searchList.map((title: AnimeType) => {
            const titleCode = title.url.replace('https://shikimori.one/animes/', '')
            const posterSourceURL = title.poster?.mainUrl ?? '/missing-image.png'
            const originalName = title.name
            const russianName = title.russian ?? originalName
            const animeKind = title.kind
            const animeStatus = title.status

            return (
                {
                    value: `${titleCode}--${posterSourceURL}--${russianName}--${animeKind}--${animeStatus}--${originalName}`,
                    label: `${russianName} / ${originalName}`,
                }
            )
        });
    }

    useEffect(() => {
        // Не проблема, т.к. есть проверка на isFetching в <Autocomplete data={проверка} />
        // @ts-ignore
        setTitles(data)
    }, [data]);

    return (
        <>
            <Autocomplete
                comboboxProps={{ transitionProps: { transition: "fade-up" }, position: 'bottom' }}
                classNames={{
                    wrapper: classes.wrapper,
                    dropdown: classes.dropdown,
                    option: classes.option,
                    input: classes.input
                }}
                variant="unstyled"
                maxDropdownHeight={800}
                data={
                    isFetching
                        ? [{ label: ' ', value: 'fetching', disabled: true }]
                        : titles
                }
                onChange={(event) => {
                    setInput(event)
                }}
                placeholder="Поиск"
                leftSection={
                    <IconSearch className={classes.icon} size="1rem" />
                }
                value={input}
                rightSectionPointerEvents="auto"
                rightSection={
                    search
                    && <CloseButton onClick={() => {
                        setInput('')
                    }} />
                }
                onOptionSubmit={(option) => {
                    // Если функция close существует, то она вызывается
                    close && close()
                    NProgress.start()
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
            />
        </>
    );
}