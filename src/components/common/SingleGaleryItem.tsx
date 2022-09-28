import { useState } from "react";
import { Link } from "react-router-dom";
import { GaleryItem } from "./Galery";
import { GaleryImage } from "./GaleryImage";

export type Model = 'news' | 'pictures' | 'cards' | 'collections' | 'products';

interface Props {
    item: GaleryItem;
    model: Model;
}

export const SingleGaleryItem = ({ item, model }: Props) => {
    const { id, img, img2, title } = item;

    const [active, setActive] = useState(false);

    return (
        <li
            className="galery__item"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            <Link to={`/${model}/${id}`}>
                <GaleryImage src={img.id} alt={img.alt} active={true} />
                <GaleryImage src={img2.id} alt={img2.alt} active={!active} />
                <p className="galery__title galery__title--picture">{title}</p>
            </Link>
        </li>
    );
}