'use client';

import { useEffect, useState } from 'react';
import {
    AutocompleteProps, CloseButton,
    ComboboxItem, Flex,
    Image,
    OptionsFilter,
    Select, Skeleton,
    Text,
} from '@mantine/core';
import {useDebouncedState} from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './Search.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import NProgress from 'nprogress';
import { client } from 'node-shikimori';
import {ShikimoriAnimesListType} from "@/types/ShikimoriAnimesListType";
import NextImage from 'next/image'

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название от трёх символов" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает, поэтому всё отлично
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    let status

    switch (optionData[3]) {
        case 'anons':
            status = 'Анонсировано'
            break
        case 'ongoing':
            status = 'В работе'
            break
        case 'released':
            status = 'Завершено'
            break
        default:
            status = 'Неизвестно'
            break
    }

    switch (option.value) {
        case 'nothing':
            return (
                <>
                    <Image className={classes.poster} alt="Anime character" radius="sm" src={searchAutocomplete.nothing.image} />
                    <Text>{searchAutocomplete.nothing.label}</Text>
                </>
            );
        case 'notEnoughChars':
            return (
                <>
                    <Image className={classes.poster} alt="Anime character" radius="sm" src={searchAutocomplete.notEnoughChars.image} />
                    <Text>{searchAutocomplete.notEnoughChars.label}</Text>
                </>
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
                    blurDataURL="/blurredPlaceholderImage.png"
                    width={96}
                    height={128}
                    component={NextImage}
                    className={classes.poster}
                    radius="sm"
                />
            </div>
            <div>
                <Text lineClamp={2} size="xl">{optionData[2]}</Text>
                <Text lineClamp={2} size="md" opacity={0.5}>{status}{optionData[4] ? `, ${optionData[4]}` : []}</Text>
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

        const searchList = await shikimori.animes.list({
            search: keyInput,
            limit: 5
        })

        if (searchList.length < 1) {
            const nothingFound = [{ label: ' ', value: 'nothing', disabled: true }];
            // @ts-ignore
            setTitles(nothingFound);
            return nothingFound;
        }

        const shikimoriURL = 'https://shikimori.one'

        // @ts-ignore
        const titlesList = searchList.map((title: ShikimoriAnimesListType) => (
            {
                value: `${title.url.replace('/animes/', '')}--${shikimoriURL + title.image.preview}--${title.russian}--${title.status}--${title.name}`,
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