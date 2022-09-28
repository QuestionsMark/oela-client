import { CollectionInterface } from "../../../types";

import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { Pagination } from "../../common/Pagination";
import { Galery, GaleryItem } from "../../common/Galery";

import { useSearch } from "../../../hooks/useSearch";
import { COLLECTION_LIMIT } from "../../../utils/dataLimits";

export const Collections = () => {
    const {
        amount,
        data,
        loading,
        page,
        searchPhrase,
        setPage,
        handleSearchPhraseChange
    } = useSearch<CollectionInterface>(
        'collection',
        COLLECTION_LIMIT,
    );

    const getGalery = (): GaleryItem[] => {
        return data.map(({ id, images, name }) => ({ id, img: images[0], img2: images[1], title: name }));
    }

    return (
        <main className="main cards">
            <Search value={searchPhrase} handleSearch={handleSearchPhraseChange} />
            {loading ? <Loading /> : <Galery galery={getGalery()} model="collections" />}
            {!loading && <Pagination page={page} setPage={setPage} amount={amount} limit={COLLECTION_LIMIT} />}
        </main>
    );
}