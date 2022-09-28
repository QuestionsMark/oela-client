import { ProductInterface } from "../../types";
import { Link } from "./Link";
import { SpecificationItem } from "./SpecificationItem";
import { Text } from "./Text";

interface Props {
    product: ProductInterface;
    linkText: string;
}

export const ProductAsideInfo = ({ product, linkText }: Props) => {

    const specificationList = () => {
        return product.specifications.map(s => <SpecificationItem key={s.id} specification={s} />);
    };

    return (
        <aside className="product__aside">
            <div className="product__aside-section">
                <h2 className="product__title">{product.name}</h2>
                <Text className="product__description">{product.description}</Text>
            </div>
            {product.specifications.length > 0 && <div className="product__aside-section specifications">
                <ul className="specifications__list">
                    {specificationList()}
                </ul>
            </div>}
            <div className="product__aside-section">
                <Link to={product.shopLink}>{linkText}</Link>
            </div>
        </aside>
    );
};