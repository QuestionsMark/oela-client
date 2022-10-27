import { useLocation } from "react-router-dom";
import { URLSearchParamsString } from "./useSearch";

export const useURLQueryString = (): URLSearchParamsString => {
    const { search: locationQueryString, pathname } = useLocation();
    const entries = locationQueryString
        .slice(1)
        .split('&')
        .map(q => {
            const entries = q.split('=');
            return [entries[0], entries[1]];
        });
    const {
        page,
        search: querySearch,
        hashtags: queryHashtags,
        productType: queryProductType,
    } = Object.fromEntries(entries);
    const queryPage = Number.isNaN(Number(page)) ? '1' : String(page);
    
    return { queryPage, querySearch, queryProductType, queryHashtags, pathname, locationQueryString };
};