import {useState} from "react";
import {rem, Stack, Tabs, Title} from "@mantine/core";

export default function SettingsButton() {
    const [activeTab, setActiveTab] = useState<string | null>('general');

    return (
        <Stack p={rem(8)} gap={rem(16)}>
            <Title order={2}>Настройки</Title>
            <Tabs  variant="pills" radius="sm" value={activeTab} onChange={setActiveTab} orientation="vertical">
                <Tabs.List>
                    <Tabs.Tab value="general">Общие</Tabs.Tab>
                    <Tabs.Tab value="about">О сайте</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general">Общие & theme & language</Tabs.Panel>
                <Tabs.Panel value="about">О сайте & github & license & contact</Tabs.Panel>
            </Tabs>
        </Stack>
    );
}