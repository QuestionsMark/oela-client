import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { ProductInterface } from "../../../types";
import { makeSlidesFromImages } from "../../../utils/getSlides";
import { LightBox } from "../../common/LightBox";
import { Loading } from "../../common/Loading";

import { MyCarousel } from "../../common/MyCarousel";
import { ProductAsideInfo } from "../../common/ProductAsideInfo";

export const Product = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { id } = useParams();
    const { data: product } = useData<ProductInterface>(`product/${id}`, componentRef);

    return (
        <main ref={componentRef} className="main product">
            {product ?
                <div className="product__wrapper slide-animation">
                    <section className="product__content">
                        <LightBox images={product.images}>
                            {(actions) => <MyCarousel slides={makeSlidesFromImages(product.images)} showThumbs className="product__carousel" actions={actions} />}
                        </LightBox>
                    </section>
                    <ProductAsideInfo linkText="zamów produkt" product={product} />
                </div> : <Loading />}
        </main>
    );
};