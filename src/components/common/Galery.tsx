import { Img } from "../../types";
import { Model, SingleGaleryItem } from "./SingleGaleryItem";

export interface GaleryItem {
    id: string;
    img: Img;
    img2: Img;
    title: string;
}

interface Props {
    galery: GaleryItem[];
    model: Model;
}

export const Galery = ({ galery, model }: Props) => {

    const galeryList = () => galery.map(i => <SingleGaleryItem key={i.id} item={i} model={model} />);

    return (
        <section className="galery show">
            {galery.length > 0 && <ul className="galery__list">
                {galeryList()}
            </ul>}
        </section>
    );
}