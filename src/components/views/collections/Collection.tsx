import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { CollectionInterface } from "../../../types";
import { Galery, GaleryItem } from "../../common/Galery";
import { Loading } from "../../common/Loading";
import { Text } from "../../common/Text";

export const Collection = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { id } = useParams();

    const { data: collection } = useData<CollectionInterface>(`collection/${id}`, componentRef);

    const getGalery = (): GaleryItem[] => {
        if (!collection) return [];
        return collection.products.map(({ id, images, name }) => ({ id, img: images[0], img2: images[1], title: name }));
    }

    return (
        <main ref={componentRef} className="main collection">
            {collection ?
                <div className="collection__wrapper slide-animation">
                    <h1 className="collection__title">{collection.name}</h1>
                    <Text className="collection__description">{collection.description}</Text>
                    <Galery galery={getGalery()} model="products" />
                </div> : <Loading />}
        </main>
    );
};