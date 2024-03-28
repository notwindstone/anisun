'use client';

import { useEffect, useState } from 'react';
import {
    AutocompleteProps,
    ComboboxItem,
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
import { IconSearch } from '@tabler/icons-react';
import styles from './Search.module.css';

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
                <>Ничего не найдено</>
            );
        case 'notEnoughChars':
            return (
                <>Введите название от трёх символов</>
            );
    }

    return (
        <Group gap="sm">
            <div>
                <Image className={styles.poster} src={optionData[1]} radius="sm" />
            </div>
            <div>
                <Text size="sm">{optionData[2]}</Text>
                <Text size="xs" opacity={0.5}>{optionData[3]}{optionData[4] ? `, ${optionData[4]}` : []}</Text>
            </div>
        </Group>
    );
};

export function Search() {
    const router = useRouter();
    const [search, setSearch] = useDebouncedState('', 300);
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
              data={titles}
              defaultValue={search}
              onSearchChange={(event) => setSearch(event)}
              placeholder="Поиск"
              rightSection={
                  isFetching ? <Loader size="1rem" /> : <IconSearch size="1rem" />
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
