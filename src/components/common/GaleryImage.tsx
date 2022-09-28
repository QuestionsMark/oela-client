import { HOST_ADDRESS } from "../../config";

interface Props {
    active?: boolean;
    alt: string;
    src: string;
}

export const GaleryImage = ({ alt, src, active }: Props) => {
    return <img
        src={`${HOST_ADDRESS}/file/${src}`}
        alt={alt}
        className={`img img--galery${active ? ' active' : ''}`}
        crossOrigin= "anonymous"
    />;
}