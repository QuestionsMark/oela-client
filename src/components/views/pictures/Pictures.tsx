import { ProductInterface } from "../../../types";

import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { Pagination } from "../../common/Pagination";
import { Galery, GaleryItem } from "../../common/Galery";

import { useSearch } from "../../../hooks/useSearch";
import { PRODUCT_LIMIT } from "../../../utils/dataLimits";

export const Pictures = () => {

    const {
        amount,
        data,
        loading,
        page,
        searchPhrase,
        setPage,
        handleSearchPhraseChange
    } = useSearch<ProductInterface>('product/picture', PRODUCT_LIMIT);

    const getGalery = (): GaleryItem[] => {
        if (!data) return [];
        return data.map(({ id, images, name }) => ({ id, img: images[0], img2: images[1], title: name }));
    }

    return (
        <main className="main pictures">
            <Search value={searchPhrase} handleSearch={handleSearchPhraseChange} />
            {loading ? <Loading /> : <Galery galery={getGalery()} model="products" />}
            {!loading && <Pagination page={page} setPage={setPage} amount={amount} limit={PRODUCT_LIMIT} />}
        </main>
    );
}