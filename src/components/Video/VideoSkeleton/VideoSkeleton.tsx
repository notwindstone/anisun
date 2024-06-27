import {AspectRatio, Skeleton} from "@mantine/core";
import classes from './VideoSkeleton.module.css';

export default function VideoSkeleton() {
    return (
        <AspectRatio className={classes.borderRadius} ratio={16 / 9}>
            <Skeleton
                className={classes.borderRadius}
                height="100%"
                width="100%"
            />
        </AspectRatio>
    );
}