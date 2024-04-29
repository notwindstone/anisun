import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import {
    IconBrandDiscord,
    IconPlayerPlay,
    IconBrandTelegram,
    IconBrandGithub,
} from '@tabler/icons-react';
import classes from './Footer.module.css';
import Spacer from "@/components/Footer/Spacer";
import Link from "next/link";

const discordLink = "https://discord.gg/JhmkZDScfg"

const data = [
    {
        title: 'О проекте',
        links: [
            { label: 'Features', link: '/' },
            { label: 'Pricing', link: '/' },
            { label: 'Support', link: '/' },
            { label: 'Forums', link: '/' },
        ],
    },
    {
        title: 'Сообщество',
        links: [
            { label: 'Discord', link: discordLink },
            { label: 'Follow on Twitter', link: '/' },
            { label: 'Email newsletter', link: '/' },
            { label: 'GitHub discussions', link: '/' },
        ],
    },
];

export default function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component={Link}
                href={link.link}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <>
            <Spacer />
            <footer className={classes.footer}>
                <Container className={classes.inner}>
                    <div className={classes.logo}>
                        <IconPlayerPlay size={30}/>
                        <Text size="xs" c="dimmed" className={classes.description}>
                            Сайт для онлайн просмотра аниме на основе Next.JS 14, Mantine UI, Tanstack Query и Drizzle ORM. Используется плеер на AniLibria API и Kodik, а поиск аниме происходит через Shikimori API.
                        </Text>
                    </div>
                    <div className={classes.groups}>{groups}</div>
                </Container>
                <Container className={classes.afterFooter}>
                    <Text c="dimmed" size="sm">
                        © 2024 animeth.vercel.app
                    </Text>

                    <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                        <ActionIcon component={Link} href="https://t.me/democracysucks" size="lg" color="gray" variant="subtle">
                            <IconBrandTelegram style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon component={Link} href={discordLink} size="lg" color="gray" variant="subtle">
                            <IconBrandDiscord style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon component={Link} href="https://github.com/windstone-aristotle-yellow/animeth" size="lg" color="gray" variant="subtle">
                            <IconBrandGithub style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                    </Group>
                </Container>
            </footer>
        </>
    );
}