import {useState} from "react";
import {rem, Stack, Tabs, Text, Title} from "@mantine/core";
import classes from './SettingsButton.module.css';

export default function SettingsButton() {
    const [activeTab, setActiveTab] = useState<string | null>('general');

    return (
        <Stack p={rem(8)} gap={rem(16)}>
            <Title c="white" order={2}>Настройки</Title>
            <Tabs
                classNames={{
                    root: classes.root,
                    list: classes.list,
                    panel: classes.panel,
                    tab: classes.tab,
                }}
                variant="pills"
                radius="md"
                value={activeTab}
                onChange={setActiveTab}
                orientation="vertical"
            >
                <Tabs.List>
                    <Tabs.Tab value="general">
                        <Text c="white">Общие</Text>
                    </Tabs.Tab>
                    <Tabs.Tab c="white" value="about">
                        <Text c="white">О сайте</Text>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel c="white" value="general">Общие & theme & language</Tabs.Panel>
                <Tabs.Panel c="white" value="about">О сайте & github & license & contact</Tabs.Panel>
            </Tabs>
        </Stack>
    );
}