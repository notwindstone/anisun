'use client';

import { useEffect, useState } from 'react';
import {
    AutocompleteProps, CloseButton,
    ComboboxItem,
    Group, Image,
    OptionsFilter,
    Select, Skeleton,
    Text,
} from '@mantine/core';
import {useClickOutside, useDebouncedState} from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './Search.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import {AnimeTitleType} from "@/types/AnimeTitleType";

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название от трёх символов" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает, поэтому всё отлично
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
                <Group gap="sm">
                    <div>
                        <Skeleton>
                            <Image className={classes.poster} w={64} h={92} radius="sm" alt=""/>
                        </Skeleton>
                    </div>
                    <div>
                        <Skeleton height={24} width={256} radius="xl" mb="xs" />
                        <Skeleton height={24} width={256} radius="xl" />
                    </div>
                </Group>
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
    const [opened, setOpened] = useState(false)
    const ref = useClickOutside(() => setOpened(false))

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

        const titlesList = searchList.map((title: AnimeTitleType) => (
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
    }, [refetch, search]);

    return (
        <>
            <Select
                ref={ref}
                onClick={() => setOpened(true)}
                dropdownOpened={opened}
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
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
            />
        </>
    );
}