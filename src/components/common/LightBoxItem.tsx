import { Img } from "../../types";
import { Image } from "./Image";
import { LightBoxActions } from "./LightBox";

interface Props {
    actions: LightBoxActions;
    image: Img;
}

export const LightBoxItem = ({ actions, image }: Props) => {
    const { changeIndex, actualIndex, index } = actions;
    const { alt, id } = image;

    return (
        <li className={`lightbox__item${index === actualIndex ? ' active' : ''}`} onClick={() => index !== undefined ? changeIndex(index) : undefined}>
            <Image alt={alt} src={id} />
        </li>
    );
};