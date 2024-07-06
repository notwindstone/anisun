import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Select, Skeleton} from "@mantine/core";
import classes from '@/components/Filters/FiltersSelect.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";
import calculateColor from "@/utils/Misc/calculateColor";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {useTranslations} from "next-intl";

export default (function StudioFilter({
    studio,
    setStudio
}: {
    studio: string | null,
    setStudio: Dispatch<SetStateAction<string | null>>
}) {
    const translate = useTranslations('Translations');
    const [studiosData, setStudiosData] = useState<{ label: string, value: string }[]>([]);
    const shikimori = client();
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);

    const { data, isPending, error } = useQuery({
        queryKey: ['studios'],
        queryFn: getStudios,
    });

    async function getStudios() {
        return shikimori.animes.studios();
    }

    useEffect(() => {
        if (!data) {
            return;
        }

        const studios: { label: string; value: string }[] = [];

        data.forEach((studio: { name: string; id: number }) => {
            return studios.push({
                label: studio.name,
                value: studio.id.toString(),
            });
        });

        studios.sort((a, b) => {
            if (a.label > b.label) {
                return 1;
            }

            if (a.label < b.label) {
                return -1;
            }

            return 0;
        });

        setStudiosData(studios);
    }, [data]);

    if (isPending) {
        return (
            <Skeleton radius="md" w="100%" h={36} />
        );
    }

    if (error) {
        return (
            <>
                {translate('common__error-label')}: {error.message}
            </>
        );
    }

    return (
        <>
            <Select
                limit={10}
                searchable
                onDropdownOpen={open}
                onDropdownClose={close}
                styles={{
                    input: {
                        borderColor: focused ? color : undefined
                    }
                }}
                classNames={classes}
                placeholder={translate('component__studio-filter__studio-placeholder-label')}
                value={studio}
                onChange={setStudio}
                data={studiosData}
            />
        </>
    );
});