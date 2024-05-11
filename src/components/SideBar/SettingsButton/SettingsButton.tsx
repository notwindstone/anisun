import {useState} from "react";
import {rem, Stack, Tabs, Text, Title, Transition} from "@mantine/core";
import classes from './SettingsButton.module.css';
import useRipple from "use-ripple-hook";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";

export default function SettingsButton() {
    const [activeTab, setActiveTab] = useState<string | null>('general');
    const [rippleGeneral, eventGeneral] = useRipple();
    const [rippleAbout, eventAbout] = useRipple();
    const valueGeneral = 'general'
    const valueAbout = 'about'

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
                    <Tabs.Tab ref={rippleGeneral} onPointerDown={eventGeneral} value={valueGeneral}>
                        <Text c="white">Общие</Text>
                    </Tabs.Tab>
                    <Tabs.Tab ref={rippleAbout} onPointerDown={eventAbout} c="white" value={valueAbout}>
                        <Text c="white">О сайте</Text>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel c="white" value={valueGeneral}>
                    <Transition
                        mounted={activeTab === valueGeneral}
                        transition="fade"
                        duration={300}
                        timingFunction="ease"
                    >
                        {(styles) => <div style={styles}><ColorSchemeControl /></div>}
                    </Transition>
                </Tabs.Panel>
                <Tabs.Panel c="white" value={valueAbout}>
                    <Transition
                        mounted={activeTab === valueAbout}
                        transition="fade"
                        duration={300}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <div style={styles}>
                                Github
                                Contact
                                License
                            </div>
                        )}
                    </Transition>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}