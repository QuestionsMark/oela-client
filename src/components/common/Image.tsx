import { HOST_ADDRESS } from "../../config";

interface Props {
    alt: string;
    src: string;
    className?: string;
    isStatic?: boolean;
}

export const Image = ({ alt, src, className, isStatic }: Props) => {
    return (
        <img
            src={isStatic ? src : `${HOST_ADDRESS}/file/${src}`}
            alt={alt}
            className={`img${className ? ' ' + className : ''}`}
            crossOrigin="anonymous"
        />
    )
};