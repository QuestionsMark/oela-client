import { useRef } from "react";
import { useData } from "../../../hooks/useData";
import { NewsInterface } from "../../../types";
import { Slide } from "../../common/CarouselItem";
import { CarouselScreen } from "../../common/CarouselScreen";
import { Loading } from "../../common/Loading";

export const News = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { data: news } = useData<NewsInterface[]>('news/last', componentRef);

    const getItems = (): Slide[] => {
        if (!news) return [];
        return news.map(({ id, images, description, name }) => ({ id, src: images[0].id, alt: images[0].alt, title: name, description }));
    }

    return (
        <main className="main" ref={componentRef}>
            {news ? <div className="show"><CarouselScreen slides={getItems()} /></div> : <Loading />}
        </main>
    );
}