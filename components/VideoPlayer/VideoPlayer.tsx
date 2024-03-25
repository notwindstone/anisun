import '@vidstack/react/player/styles/default/theme.css';
import { ChapterTitle, Controls, Gesture, MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import styles from './VideoPlayer.module.css';
import * as Buttons from '@/components/VideoPlayer/VideoPlayerComponents/Buttons';
import * as Menus from '@/components/VideoPlayer/VideoPlayerComponents/Menus';
import * as Sliders from '@/components/VideoPlayer/VideoPlayerComponents/Sliders';
import { TimeGroup } from '@/components/VideoPlayer/VideoPlayerComponents/TimeGroup';

interface VideoPlayerProps {
    source: string;
    preview: string;
}

export default function VideoPlayer({ source, preview }: VideoPlayerProps) {
    return (
        <div className={styles.wrapper}>
            <MediaPlayer
              title={source}
              src={source}
              viewType="video"
            >
                <MediaProvider>
                    <Poster src={preview} alt="Anime episode preview" />
                </MediaProvider>
                <Gestures />
                <Controls.Root className={`${styles.controls} vds-controls`}>
                    <div className="vds-controls-spacer" />
                    <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
                        <Sliders.Time />
                    </Controls.Group>
                    <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
                        <Buttons.Play tooltipPlacement="top start" />
                        <Buttons.Mute tooltipPlacement="top" />
                        <Sliders.Volume />
                        <TimeGroup />
                        <ChapterTitle className="vds-chapter-title" />
                        <div className="vds-controls-spacer" />
                        <Menus.Settings placement="top end" tooltipPlacement="top" />
                        <Buttons.PIP tooltipPlacement="top" />
                        <Buttons.Fullscreen tooltipPlacement="top end" />
                    </Controls.Group>
                </Controls.Root>
            </MediaPlayer>
        </div>
    );
}

function Gestures() {
    return (
        <>
            <Gesture className={styles.gesture} event="pointerup" action="toggle:paused" />
            <Gesture className={styles.gesture} event="dblpointerup" action="toggle:fullscreen" />
            <Gesture className={styles.gesture} event="pointerup" action="toggle:controls" />
            <Gesture className={styles.gesture} event="dblpointerup" action="seek:-10" />
            <Gesture className={styles.gesture} event="dblpointerup" action="seek:10" />
        </>
    );
}
