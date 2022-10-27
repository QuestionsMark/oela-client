import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { HOST_ADDRESS } from '../config';
import { useNavigate,  } from 'react-router-dom';
import { useURLQueryString } from './useURLQueryString';

export interface Queries {
    hashtags?: string[];
    productType?: string;
}

export interface URLSearchParamsObject {
    page?: string;
    search?: string;
    productType?: string;
    hashtags?: string[];
}

export interface URLSearchParamsString {
    pathname: string;
    locationQueryString: string;
    queryPage: string;
    querySearch: string;
    queryProductType: string;
    queryHashtags: string;
}

export interface SearchResult<T> {
    data: T[];
    loading: boolean;
    hasMore: boolean;
    amount: number;
    page: number;
    searchPhrase: string;
    handleSearchPhraseChange: (text: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
    refresh: () => void;
}

export function useSearch<T>(collection: string, limit: number, queries: Queries = {}, dependencies: any[] = []): SearchResult<T> {

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const delayTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const { locationQueryString, pathname, queryPage, querySearch } = useURLQueryString();

    const stringify = (): Queries => {
        const { hashtags, productType } = queries;
        return {
            hashtags: !hashtags || hashtags.length === 0 ? undefined : hashtags,
            productType: productType || undefined,
        };
    };

    const [reload, setReload] = useState(false);
    const [page, setPage] = useState<number>(queryPage ? Number(queryPage) : 1);
    
    const [locationPage, setLocationPage] = useState<number>(queryPage ? Number(queryPage) : 1);
    const [stringifyQueries, setStringifyQueries] = useState<Queries>(stringify());
    const [searchPhrase, setSearchPhrase] = useState(decodeURI(querySearch || ''));
    const [search, setSearch] = useState(decodeURI(querySearch || ''));
    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };

    const refresh = () => {
        setReload(state => !state);
        setPage(1);
    };

    useEffect(() => {
        const { hashtags, productType } = queries;
        const searchParamsObject: URLSearchParamsObject = {};

        if (page !== 1) {
            searchParamsObject.page = String(page);
        }
        if (searchPhrase) {
            searchParamsObject.search = searchPhrase;
        }
        if (productType) {
            searchParamsObject.productType = productType;
        }
        if (hashtags && hashtags.length !== 0) {
            searchParamsObject.hashtags = hashtags;
        }

        const searchParams = new URLSearchParams(searchParamsObject as any).toString();

        navigate(`${pathname}${page !== 1 || searchPhrase || productType || hashtags ? '?' : ''}${searchParams}`);
    }, [page, search, stringifyQueries]);

    useEffect(() => {
        if (!queryPage) return;
        setLocationPage(Number(queryPage));
        if (page !== Number(queryPage)) {
            setPage(Number(queryPage));
        }
        setSearchPhrase(decodeURI(querySearch || ''));
    }, [locationQueryString]);

    useEffect(() => {
        setData([]);
    }, [reload, search, stringifyQueries, page]);

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(1);
            setLocationPage(1);
            setSearch(searchPhrase);
            if (JSON.stringify(stringifyQueries) !== JSON.stringify(stringify())) {
                setData([]);
                setStringifyQueries(stringify());
            }
        }, 500);
    }, [searchPhrase, ...dependencies]);

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
    }, []);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        const startTime = new Date().valueOf();
        if (delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current);
        }
        if (data.length === 0) {
            setLoading(true);
        }
        let cancel: Canceler;
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: search,
                page: locationPage,
                limit,
                ...stringifyQueries,
            },
            cancelToken: new axios.CancelToken(c => cancel = c),
        })
            .then(res => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    setLoading(false);
                    setAmount(res.data.count);
                    setData(prev => [...prev, ...res.data.results]);
                    setHasMore(res.data.results.length > 0);
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            })
            .catch((e: AxiosError) => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    if (axios.isCancel(e)) return;
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            });

        return () => {
            if (delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current);
            }
            cancel();
        }

    }, [search, locationPage, collection, reload, stringifyQueries]);

    return { loading, data, hasMore, amount, page: locationPage, searchPhrase, setPage, handleSearchPhraseChange, refresh };
}