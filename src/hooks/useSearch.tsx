import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { HOST_ADDRESS } from '../config';

export interface Queries {
    hashtags?: string[];
    productType?: string;
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

    const stringify = (): Queries => {
        const { hashtags, productType } = queries;
        return {
            hashtags: !hashtags || hashtags.length === 0 ? undefined : hashtags,
            productType: productType || undefined,
        };
    };

    const [reload, setReload] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [stringifyQueries, setStringifyQueries] = useState<Queries>(stringify());
    const [searchPhrase, setSearchPhrase] = useState('');
    const [search, setSearch] = useState('');
    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };

    const refresh = () => {
        setReload(state => !state);
        setPage(1);
    };

    useEffect(() => {
        setData([]);
    }, [reload, search, stringifyQueries, page]);

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(1);
            setSearch(searchPhrase);
            if (JSON.stringify(stringifyQueries) !== JSON.stringify(stringify())) {
                setData([]);
                setStringifyQueries(stringify());
            }
        }, 500);
    }, [searchPhrase, ...dependencies]);

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
                page: page,
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

    }, [search, page, collection, reload, stringifyQueries]);

    return { loading, data, hasMore, amount, page, searchPhrase, setPage, handleSearchPhraseChange, refresh };
}