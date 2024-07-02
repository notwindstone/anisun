"use client";

import AnilibriaVideo from "@/components/Video/AnilibriaVideo/AnilibriaVideo";
import {useState} from "react";
import {Alert, AspectRatio, rem, SegmentedControl, Stack} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './Video.module.css';
import KodikVideo from "@/components/Video/KodikVideo/KodikVideo";
import {IconInfoCircle} from "@tabler/icons-react";
import SovetRomanticaVideo from "@/components/Video/SovetRomanticaVideo/SovetRomanticaVideo";
import {useTranslations} from "next-intl";
import VidstreamingVideo from "@/components/Video/VidstreamingVideo/VidstreamingVideo";

const ANILIBRIA_PLAYER = "anilibria";
const KODIK_PLAYER = "kodik";
const SOVETROMANTICA_PLAYER = "sovetromantica";
const VIDSTREAMING_PLAYER = "vidstreaming";

export default function Video({ id }: { id: string }) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();
    const [player, setPlayer] = useState(KODIK_PLAYER);

    const KODIK_DESCRIPTION = translate('component__video__player-kodik-description-label');
    const ANILIBRIA_DESCRIPTION = translate('component__video__player-anilibria-description-label');
    const SOVETROMANTICA_DESCRIPTION = translate('component__video__player-sovetromantica-description-label');
    const VIDSTREAMING_DESCRIPTION = translate('component__video__player-vidstreaming-description-label');

    return (
        <Stack p={0} gap={rem(8)}>
            <AspectRatio ratio={16 / 9}>
                <div className={classes.placeholder} />
                <div className={classes.playerInner}>
                    {
                        player === KODIK_PLAYER ? (
                            <KodikVideo id={id} />
                        ) : player === ANILIBRIA_PLAYER ? (
                            <AnilibriaVideo id={id} />
                        ) : player === SOVETROMANTICA_PLAYER ? (
                            <SovetRomanticaVideo id={id} />
                        ) : (
                            <VidstreamingVideo />
                        )
                    }
                </div>
            </AspectRatio>
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
                    { label: 'Anisun', value: ANILIBRIA_PLAYER },
                    { label: 'SovetRomantica', value: SOVETROMANTICA_PLAYER },
                    { label: 'Vidstreaming (English)', value: VIDSTREAMING_PLAYER }
                ]}
            />
            <Alert
                className={classes.alert}
                radius="md"
                variant="light"
                color="gray"
                title={translate('component__video__player-information-label')}
                icon={<IconInfoCircle />}
            >
                {
                    player === KODIK_PLAYER
                        ? KODIK_DESCRIPTION
                        : player === ANILIBRIA_PLAYER
                            ? ANILIBRIA_DESCRIPTION
                            : player === SOVETROMANTICA_PLAYER
                                ? SOVETROMANTICA_DESCRIPTION
                                : VIDSTREAMING_DESCRIPTION
                }
            </Alert>
        </Stack>
    );
}