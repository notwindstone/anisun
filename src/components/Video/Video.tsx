"use client";

import AnilibriaVideo from "@/components/Video/AnilibriaVideo/AnilibriaVideo";
import {useState} from "react";
import {rem, SegmentedControl, Stack} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './Video.module.css';
import KodikVideo from "@/components/Video/KodikVideo/KodikVideo";

const ANILIBRIA_PLAYER = "anilibria";
const KODIK_PLAYER = "kodik";

export default function Video({ id }: { id: string }) {
    const { theme } = useCustomTheme();
    const [player, setPlayer] = useState(KODIK_PLAYER);

    return (
        <Stack p={0} gap={rem(8)}>
            {
                player === KODIK_PLAYER ? (
                    <KodikVideo id={id} />
                ) : (
                    <AnilibriaVideo id={id} />
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
                ]}
            />
        </Stack>
    );
}