"use client";

import AnilibriaVideo from "@/components/Video/AnilibriaVideo/AnilibriaVideo";
import {useState} from "react";
import {Alert, rem, SegmentedControl, Stack} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './Video.module.css';
import KodikVideo from "@/components/Video/KodikVideo/KodikVideo";
import {IconInfoCircle} from "@tabler/icons-react";
import SovetRomanticaVideo from "@/components/Video/SovetRomanticaVideo/SovetRomanticaVideo";

const ANILIBRIA_PLAYER = "anilibria";
const KODIK_PLAYER = "kodik";
const SOVETROMANTICA_PLAYER = "sovetromantica";
const KODIK_DESCRIPTION = 'К сожалению, в плеере Kodik нельзя отключить рекламу. Она встроена в плеер и не зависит от нашего сайта. Зато доступен широкий выбор озвучек!';
const ANILIBRIA_DESCRIPTION = 'В нашем плеере отсутствует реклама, но озвучка используется только от AniLibria.';
const SOVETROMANTICA_DESCRIPTION = 'В плеере от SovetRomantica используются только субтитры.';

export default function Video({ id }: { id: string }) {
    const { theme } = useCustomTheme();
    const [player, setPlayer] = useState(KODIK_PLAYER);

    return (
        <Stack p={0} gap={rem(8)}>
            {
                player === KODIK_PLAYER ? (
                    <KodikVideo id={id} />
                ) : player === ANILIBRIA_PLAYER ? (
                    <AnilibriaVideo id={id} />
                ) : (
                    <SovetRomanticaVideo id={id} />
                )
            }
            <SegmentedControl
                classNames={{
                    root: classes.root
                }}
                autoContrast
                color={theme.color}
                fullWidth
                withItemsBorders={false}
                value={player}
                onChange={setPlayer}
                data={[
                    { label: 'Kodik', value: KODIK_PLAYER },
                    { label: 'Animeth', value: ANILIBRIA_PLAYER },
                    { label: 'SovetRomantica', value: SOVETROMANTICA_PLAYER }
                ]}
            />
            <Alert
                radius="md"
                variant="light"
                color="gray"
                title="Информация о плеере"
                icon={<IconInfoCircle />}
            >
                {
                    player === KODIK_PLAYER
                        ? KODIK_DESCRIPTION
                        : player === ANILIBRIA_PLAYER
                            ? ANILIBRIA_DESCRIPTION
                            : SOVETROMANTICA_DESCRIPTION
                }
            </Alert>
        </Stack>
    );
}