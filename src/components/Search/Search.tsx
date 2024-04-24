'use client';

import { useEffect, useState } from 'react';
import {
    AutocompleteProps, CloseButton,
    ComboboxItem, Flex,
    Image,
    OptionsFilter,
    Select, Skeleton, Stack,
    Text, Title,
} from '@mantine/core';
import {useDebouncedState} from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './Search.module.css';
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

    let status = translateShikimoriStatus(optionData[4])
    let kind = translateShikimoriKind(optionData[3])

    switch (option.value) {
        case 'nothing':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="sm" src={searchAutocomplete.nothing.image} />
                    <Title order={3}>{searchAutocomplete.nothing.label}</Title>
                </Stack>
            );
        case 'notEnoughChars':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="sm" src={searchAutocomplete.notEnoughChars.image} />
                    <Title order={3}>{searchAutocomplete.notEnoughChars.label}</Title>
                </Stack>
            );
        case 'fetching':
            return (
                <Flex align="center" gap="sm">
                    <div>
                        <Skeleton width={96} height={128}>
                        </Skeleton>
                    </div>
                    <div>
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
                    src={optionData[1]}
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
                <Text lineClamp={2} size="xl">{optionData[2]}</Text>
                <Text lineClamp={2} size="lg">{kind}</Text>
                <Text lineClamp={2} size="md" opacity={0.5}>{status}{optionData[5] ? `, ${optionData[5]}` : []}</Text>
            </div>
        </Flex>
    );
};

export function Search() {
    const shikimori = client();
    const router = useRouter();
    const [search, setSearch] = useDebouncedState('', 300, { leading: true });
    const [titles, setTitles] = useState([]);

    const { refetch, isFetching } = useQuery({
        queryKey: ['titles', search],
        queryFn: async () => fetchTitles(search),
    });

    async function fetchTitles(keyInput: string) {
        if (keyInput.length < 3) {
            const notEnoughChars = [{ label: ' ', value: 'notEnoughChars', disabled: true }];
            // @ts-ignore
            setTitles(notEnoughChars);
            return notEnoughChars;
        }

        const searchList = (await shikimori.animes.list({
            search: keyInput,
            limit: 5
        })).animes

        console.log(searchList)

        if (searchList.length < 1) {
            const nothingFound = [{ label: ' ', value: 'nothing', disabled: true }];
            // @ts-ignore
            setTitles(nothingFound);
            return nothingFound;
        }

        // @ts-ignore
        const titlesList = searchList.map((title: AnimeType) => (
            {
                value: `${title.url.replace('https://shikimori.one/animes/', '')}--${title.poster?.mainUrl}--${title.russian}--${title.kind}--${title.status}--${title.name}`,
                label: `${title.russian} / ${title.name}`,
            }
        ));

        // @ts-ignore
        setTitles(titlesList);

        return titlesList;
    }

    useEffect(() => {
        refetch().then();
    }, [refetch, search]);

    return (
        <>
            <Select
                searchable
                variant="unstyled"
                maxDropdownHeight={800}
                data={
                    isFetching
                        ? [{ label: ' ', value: 'fetching', disabled: true }]
                        : titles
                }
                defaultSearchValue={search}
                onSearchChange={(event) => setSearch(event)}
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