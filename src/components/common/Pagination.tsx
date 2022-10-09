import { Dispatch, SetStateAction } from "react";

interface Props {
    page: number;
    amount: number;
    limit: number;
    setPage: Dispatch<SetStateAction<number>>
}

export const Pagination = ({ amount, limit, page, setPage }: Props) => {
    const handlePageChange = (page: number) => {
        if (!page) return;
        setPage(page);
    };

    return (
        <div className="pagination">
            {page !== 1 && <div className="pagination__btn" onClick={() => handlePageChange(page - 1)}>{page - 1}</div>}
            <div className="pagination__btn pagination__btn--current">{page}</div>
            {page * limit < amount && <div className="pagination__btn" onClick={() => handlePageChange(page + 1)}>{page + 1}</div>}
        </div>
    );
};