import { useEffect, useRef, useState } from "react";
import { HashtagInterface, PaginationResponse, ProductInterface, ProductTypeInterface } from "../../../types";

import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { Pagination } from "../../common/Pagination";
import { Galery, GaleryItem } from "../../common/Galery";

import { useSearch } from "../../../hooks/useSearch";
import { ProductTypesFilter } from "../../common/ProductTypesFilter";
import { useData } from "../../../hooks/useData";
import { HashtagFilter } from "../../common/HashtagFilter";
import { PRODUCT_LIMIT } from "../../../utils/dataLimits";
import { useScrollUp } from "../../../hooks/useScrollUp";
import { useURLQueryString } from "../../../hooks/useURLQueryString";

export const Products = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { data: productTypes } = useData<PaginationResponse<ProductTypeInterface[]>>('product-type?page=1&limit=100', componentRef);
    const { data: hashtags } = useData<PaginationResponse<HashtagInterface[]>>('hashtag?page=1&limit=100', componentRef);

    const { queryHashtags, queryProductType, queryPage } = useURLQueryString();

    const [choosedProductType, setChoosedProductType] = useState<string>(queryProductType || '');
    const handleProductTypesChange = (productType: string) => {
        setChoosedProductType(prev => prev === productType ? '' : productType);
    };

    const [choosedHashtags, setChoosedHashtags] = useState<string[]>(queryHashtags ? queryHashtags.split('%2C') : []);
    const handleHashtagsChange = (hashtag: string) => {
        setChoosedHashtags(prev => prev.includes(hashtag) ? prev.filter(h => h !== hashtag) : [...prev, hashtag]);
    };

    // jak ten useEffect jest to nie działa wracanie na zapisaną stronę, tylko wraca zawsze na pierwszą
    // useEffect(() => {
    //     setChoosedProductType(queryProductType || '');
    //     setChoosedHashtags(queryHashtags ? queryHashtags.split('%2C') : []);
    //     setPage(Number.isNaN(Number(queryPage)) ? 1 : Number(queryPage));
    // }, [queryHashtags, queryProductType]);

    const {
        amount,
        data,
        loading,
        page,
        searchPhrase,
        setPage,
        handleSearchPhraseChange,
    } = useSearch<ProductInterface>(
        'product',
        PRODUCT_LIMIT,
        { hashtags: choosedHashtags, productType: choosedProductType },
        [choosedHashtags, choosedProductType]
    );
    useScrollUp(page);

    const getGalery = (): GaleryItem[] => {
        if (!data) return [];
        return data.map(({ id, images, name }) => ({ id, img: images[0], img2: images[1], title: name }));
    }

    return (
        <main ref={componentRef} className="main cards">
            <Search value={searchPhrase} handleSearch={handleSearchPhraseChange} />
            {productTypes && <ProductTypesFilter choosedProductType={choosedProductType} productTypes={productTypes.results} handleChange={handleProductTypesChange} />}
            {hashtags && <HashtagFilter choosedHashtags={choosedHashtags} hashtags={hashtags.results} handleChange={handleHashtagsChange} />}
            {loading || !productTypes || !hashtags ? <Loading /> : <Galery galery={getGalery()} model="products" />}
            {!loading && <Pagination page={page} setPage={setPage} amount={amount} limit={PRODUCT_LIMIT} />}
        </main>
    );
}