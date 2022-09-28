import { useRef } from "react";
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { useData } from "../../../hooks/useData";
import { ProductInterface } from "../../../types";
import { makeSlidesFromImages } from "../../../utils/getSlides";
import { Loading } from "../../common/Loading";
import { MyCarousel } from "../../common/MyCarousel";
import { ProductAsideInfo } from "../../common/ProductAsideInfo";

export const Card = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { id } = useParams();

    const { data: card } = useData<ProductInterface>(`card/${id}`, componentRef);

    return (
        <main ref={componentRef} className="main product">
            {card ?
                <div className="product__wrapper slide-animation">
                    <section className="product__content">
                        <SRLWrapper>
                            <MyCarousel slides={makeSlidesFromImages(card.images)} showThumbs className="product__carousel" />
                        </SRLWrapper>
                    </section>
                    <ProductAsideInfo product={card} linkText="zamów kartkę" />
                </div> : <Loading />}
        </main>
    );
};