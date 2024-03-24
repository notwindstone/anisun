'use client';

import { Menu, rem, Text, UnstyledButton } from '@mantine/core';
import {
    IconAdjustmentsAlt,
    IconChevronRight,
    IconClockHour3,
    IconSettingsFilled,
} from '@tabler/icons-react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import classes from './VideoEmbed.module.css';
import {useState} from "react";

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
    const [value, setValue] = useState('Качество')
    const video = host + source.fhd;

    function handleClick() {
        setValue('1234')
    }

    return (
        <>
            <Menu
              classNames={{
                dropdown: classes.dropdown,
            }}
              radius="md">
                <Menu.Target>
                    <UnstyledButton>
                        <IconSettingsFilled style={{ width: rem(24), height: rem(24) }} />
                    </UnstyledButton>
                </Menu.Target>
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
                        {value}
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <VideoPlayer source={video} preview={preview} />
        </>
    );
}
