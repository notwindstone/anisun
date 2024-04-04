import {Flex, Loader} from "@mantine/core";
import classes from './LoaderEmbed.module.css'

export function LoaderEmbed() {
    return (
        <Flex
            className={classes.container}
            justify="center"
            align="center"
        >
            <Loader size={64} className={classes.loader} />
        </Flex>
    )
}