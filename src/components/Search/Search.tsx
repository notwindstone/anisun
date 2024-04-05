'use client';

import { useEffect, useState } from 'react';
import {
    AutocompleteProps, CloseButton,
    ComboboxItem, Flex,
    Group, Image,
    Loader,
    OptionsFilter,
    Select,
    Text,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './Search.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';

interface TitleProps {
    code: string;
    posters: {
        small: {
            url: string;
        }
    },
    names: {
        ru: string;
        en: string;
    },
    status: {
        string: string;
    }
}

// Filter options to show "Ничего не найдено" or "Введите название от трёх символов" I don't know how it works, but it works.
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

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
                <Flex
                    className={classes.fetchingWrapper}
                    justify="center"
                    align="center"
                >
                    <Loader size={64} />
                </Flex>
            )
    }

    return (
        <Group gap="sm">
            <div>
                <Image className={classes.poster} src={optionData[1]} alt="Anime poster" radius="sm" />
            </div>
            <div>
                <Text size="xl">{optionData[2]}</Text>
                <Text size="md" opacity={0.5}>{optionData[3]}{optionData[4] ? `, ${optionData[4]}` : []}</Text>
            </div>
        </Group>
    );
};

export function Search() {
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

        const searchData = (await axios.get(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=6`)).data;
        const searchList = await searchData.list;

        if (searchList.length < 1) {
            const nothingFound = [{ label: ' ', value: 'nothing', disabled: true }];
            // @ts-ignore
            setTitles(nothingFound);
            return nothingFound;
        }

        const titlesList = searchList.map((title: TitleProps) => (
            {
                value: `${title.code}--https://anilibria.tv${title.posters.small.url}--${title.names.ru}--${title.status.string}--${title.names.en}`,
                label: `${title.names.ru} / ${title.names.en}`,
            }
        ));

        setTitles(titlesList);
        return titlesList;
    }

    useEffect(() => {
        refetch().then();
    }, [search]);

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
                defaultValue={search}
                onSearchChange={(event) => setSearch(event)}
                placeholder="Поиск"
                leftSection={
                    <IconSearch size="1rem" />
                }
                // @ts-ignore
                rightSectionPointerEvents={true}
                rightSection={
                    search
                        ? <CloseButton onClick={() => setSearch('')} />
                        : null
                }
                onOptionSubmit={(option) => {
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
            />
        </>
    );
}