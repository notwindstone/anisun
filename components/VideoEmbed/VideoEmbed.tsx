'use client';

import { Menu, rem, Text, UnstyledButton } from '@mantine/core';
import {
    IconAdjustmentsAlt,
    IconChevronRight,
    IconClockHour3,
    IconSettingsFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import classes from './VideoEmbed.module.css';

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
    const settings =
        <Menu.Dropdown>
            <Menu.Label>Настройки</Menu.Label>
            <Menu.Item
              leftSection={
                    <IconClockHour3 style={{ width: rem(24), height: rem(24) }} />
                }
              rightSection={
                    <>
                        <Text>Обычная</Text>
                        <IconChevronRight />
                    </>
                }
            >
                Скорость воспроизведения
            </Menu.Item>
            <Menu.Item
              onClick={handleClick}
              closeMenuOnClick={false}
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
        </Menu.Dropdown>;

    const qualitySettings =
        <Menu.Dropdown>
            <Menu.Label>Качество</Menu.Label>
            <Menu.Item
              onClick={handleClick}
              closeMenuOnClick={false}
            >
                1080p
            </Menu.Item>
            <Menu.Item
              onClick={handleClick}
              closeMenuOnClick={false}
            >
                720p
            </Menu.Item>
            <Menu.Item
              onClick={handleClick}
              closeMenuOnClick={false}
            >
                480p
            </Menu.Item>
        </Menu.Dropdown>;

    const [value, setValue] = useState(settings);
    const video = host + source.fhd;

    function handleClick() {
        setValue(qualitySettings);
    }

    async function handleClose() {
        setTimeout(() => {
            setValue(settings);
        }, 150);
    }

    return (
        <>
            <Menu
              onClose={handleClose}
              classNames={{
                dropdown: classes.dropdown,
            }}
              radius="md"
            >
                <Menu.Target>
                    <UnstyledButton>
                        <IconSettingsFilled style={{ width: rem(24), height: rem(24) }} />
                    </UnstyledButton>
                </Menu.Target>
                {value}
            </Menu>
            <VideoPlayer source={video} preview={preview} />
        </>
    );
}
