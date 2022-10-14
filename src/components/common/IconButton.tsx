import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    icon: IconDefinition;
    className?: string;
    handler: () => void;
}

export const IconButton = ({ className, icon, handler }: Props) => {
    return <FontAwesomeIcon icon={icon} className={`btn${className ? ' ' + className : ''}`} onClick={handler} />;
};