'use client';

import { useEffect, useState } from 'react';
import {
    Autocomplete,
    AutocompleteProps, CloseButton,
    ComboboxItem, Flex,
    Image,
    OptionsFilter,
    Skeleton, Stack,
    Text, Title,
} from '@mantine/core';
import {useDebouncedState} from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import NProgress from 'nprogress';
import NextImage from 'next/image'
import translateShikimoriStatus from "@/utils/translateShikimoriStatus";
import {client} from "@/lib/shikimori/client";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";
import globalVariables from '../../configs/globalVariables.json'
import translateShikimoriKind from "@/utils/translateShikimoriKind";

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название от трёх символов" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает, поэтому всё отлично
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    const posterSourceURL = optionData[1]
    const russianName = optionData[2]
    let kind = translateShikimoriKind(optionData[3])
    let status = translateShikimoriStatus(optionData[4])
    const englishName = optionData[5]

    switch (option.value) {
        case 'nothing':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="sm" src={searchAutocomplete.nothing.image} />
                    <Title order={3}>{searchAutocomplete.nothing.label}</Title>
                </Stack>
            );
        case 'fetching':
            return (
                <Flex align="center" gap="sm">
                    <div>
                        <Skeleton width={96} height={128} />
                    </div>
                    <div>
                        <Skeleton height={24} width={256} radius="xl" mb="xs" />
                        <Skeleton height={24} width={256} radius="xl" mb="xs" />
                        <Skeleton height={24} width={256} radius="xl" />
                    </div>
                </Flex>
            )
    }

    return (
        <Flex align="center" gap="sm">
            <div>
                <Image
                    alt="Anime poster"
                    src={posterSourceURL}
                    placeholder="blur"
                    blurDataURL={globalVariables.imagePlaceholder}
                    width={96}
                    height={128}
                    component={NextImage}
                    className={classes.poster}
                    radius="sm"
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

export default function SearchBar() {
    const shikimori = client();
    const router = useRouter();
    const [search, setSearch] = useDebouncedState('', 300, { leading: true });
    const [titles, setTitles] = useState([]);

    const { refetch, isFetching } = useQuery({
        queryKey: ['titles', search],
        queryFn: async () => fetchTitles(search),
    });

    async function fetchTitles(keyInput: string) {
        const isOnlyWhiteSpace = !keyInput.replace(/\s/g, '').length

        if (isOnlyWhiteSpace) {
            return
        }
        
        const searchList = (await shikimori.animes.list({
            search: keyInput,
            limit: 10
        })).animes

        if (searchList.length < 1) {
            const nothingFound = [{ label: ' ', value: 'nothing', disabled: true }];
            // @ts-ignore
            setTitles(nothingFound);
            return nothingFound;
        }

        // @ts-ignore
        const titlesList = searchList.map((title: AnimeType) => {
            const titleCode = title.url.replace('https://shikimori.one/animes/', '')
            const posterSourceURL = title.poster?.mainUrl

            return (
                {
                    value: `${titleCode}--${posterSourceURL}--${title.russian}--${title.kind}--${title.status}--${title.name}`,
                    label: `${title.russian} / ${title.name}`,
                }
            )});

        // @ts-ignore
        setTitles(titlesList);

        return titlesList;
    }

    useEffect(() => {
        refetch().then();
    }, [refetch, search]);

    return (
        <>
            <Autocomplete
                variant="unstyled"
                maxDropdownHeight={800}
                data={
                    isFetching
                        // @ts-ignore
                        ? [{ label: ' ', value: 'fetching', disabled: true }]
                        : titles
                }
                onChange={(event) => setSearch(event)}
                placeholder="Поиск"
                leftSection={
                    <IconSearch size="1rem" />
                }
                rightSectionPointerEvents="auto"
                rightSection={
                    search
                    && <CloseButton onClick={() => setSearch('')} />
                }
                onOptionSubmit={(option) => {
                    NProgress.start()
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
            />
        </>
    );
}