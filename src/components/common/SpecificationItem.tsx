import { SpecificationInterface } from "../../types";

interface Props {
    specification: SpecificationInterface;
}

export const SpecificationItem = ({ specification }: Props) => {
    const { value, name } = specification;
    return (
        <li className="specifications__item">
            {name} : {value}
        </li>
    );
};