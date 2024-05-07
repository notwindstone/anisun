import classes from './HeroContent.module.css';
import ConfiguredCarousel from "@/components/HeroContent/ConfiguredCarousel/ConfiguredCarousel";

export function HeroContent() {
    return (
        <div className={classes.hero}>
            <ConfiguredCarousel
                order="popularity"
                direction="forward"
                title="Сейчас популярно"
                queryKey="popular"
            />
            <ConfiguredCarousel
                direction="backward"
                queryKey="newest"
                order="created_at"
                title="Новинки"
            />
        </div>
    );
}