import {AspectRatio, Skeleton} from "@mantine/core";
import classes from './VideoSkeleton.module.css';

export default function VideoSkeleton() {
    return (
        <AspectRatio ratio={16 / 9}>
            <Skeleton
                className={classes.skeleton}
                height="100%"
                width="100%"
            />
        </AspectRatio>
    );
}