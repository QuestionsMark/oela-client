import { ProductTypeInterface } from "../../types";
import { FilterItem } from "./FilterItem";

interface Props {
    productTypes: ProductTypeInterface[];
    choosedProductType: string;
    handleChange: (value: string) => void;
}

export const ProductTypesFilter = ({ choosedProductType, productTypes, handleChange }: Props) => {
    const checkIsChecked = (choosed: string) => {
        return choosedProductType === choosed;
    };

    const productTypesList = () => {
        return productTypes.map(h => <FilterItem key={h.id} checked={checkIsChecked(h.name)} value={h.name} handleChange={handleChange} />);
    };

    return (
        <div className="filter">
            <ul className="filter__list">
                {productTypesList()}
            </ul>
        </div>
    );
};