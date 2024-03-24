'use client';

import { Menu, rem, Text, UnstyledButton } from '@mantine/core';
import { IconAdjustmentsAlt, IconChevronRight, IconSettings } from '@tabler/icons-react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    host: string;
    source: {
        fhd: string;
        hd: string;
        sd: string;
    };
    preview: string;
}

export default function VideoEmbed({ host, source, preview }: VideoEmbedProps) {
    const video = host + source.fhd;

    return (
        <>
            <Menu>
                <Menu.Target>
                    <UnstyledButton>
                        <IconSettings style={{ width: rem(24), height: rem(24) }} />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Настройки</Menu.Label>
                    <Menu.Item
                      leftSection={
                        <IconAdjustmentsAlt style={{ width: rem(24), height: rem(24) }} />
                      }
                      rightSection={
                        <>
                            <Text>1080p</Text>
                            <IconChevronRight />
                        </>
                      }
                    >
                        Качество
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <VideoPlayer source={video} preview={preview} />
        </>
    );
}
