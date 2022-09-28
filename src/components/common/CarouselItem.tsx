import { HOST_ADDRESS } from "../../config";

export interface Slide {
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
    staticImg?: boolean;
}

interface Props {
    slide: Slide;
    fullscreen?: boolean;
    staticImg?: boolean;
}

export const CarouselItem = ({ slide, fullscreen, staticImg }: Props) => {

    const { alt, src, description, title } = slide;

    return (
        <div className="carousel__item" id="legend">
            <img
                src={staticImg ? src : `${HOST_ADDRESS}/file/${src}`}
                alt={alt}
                className={`carousel__img${fullscreen && ' carousel__img--screen'}`}
                crossOrigin="anonymous"
            />
            {title && description && <div className="legend">
                <h3 className="carousel__title">{title}</h3>
                <p className="carousel__text">{description}</p>
            </div>}
        </div>
    );
};