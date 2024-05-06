import classes from './HeroContent.module.css';
import {PopularAnimes} from "@/components/HeroContent/PopularAnimes/PopularAnimes";
import {NewestAnimes} from "@/components/HeroContent/NewestAnimes/NewestAnimes";

export function HeroContent() {
    return (
        <div className={classes.hero}>
            <PopularAnimes />
            <NewestAnimes />
        </div>
    );
}