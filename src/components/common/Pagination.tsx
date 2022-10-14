import { faAngleLeft, faAngleRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface Props {
    page: number;
    amount: number;
    limit: number;
    setPage: Dispatch<SetStateAction<number>>
}

export const Pagination = ({ amount, limit, page, setPage }: Props) => {
    const maxPage = Math.ceil(amount / limit);
    const handlePageChange = (page: number) => {
        if (!page) return;
        setPage(page);
    };

    return (
        <div className="pagination">
            {page !== 1 && <div className="pagination__btn pagination__btn--large" onClick={() => handlePageChange(page - 1)}><FontAwesomeIcon icon={faAngleLeft} /></div>}

            {page >= 4 && <div className="pagination__btn" onClick={() => handlePageChange(1)}>{1}</div>}
            {![1,2,3,4].includes(page) && <div className="pagination__btn"><FontAwesomeIcon icon={faEllipsis} /></div>}
            {page !== 1 && page !== 2 && <div className="pagination__btn pagination__btn--large" onClick={() => handlePageChange(page - 2)}>{page - 2}</div>}
            {page !== 1 && <div className="pagination__btn" onClick={() => handlePageChange(page - 1)}>{page - 1}</div>}

            <div className="pagination__btn pagination__btn--current">{page}</div>

            {page < maxPage && <div className="pagination__btn" onClick={() => handlePageChange(page + 1)}>{page + 1}</div>}
            {page < maxPage - 1 && <div className="pagination__btn pagination__btn--large" onClick={() => handlePageChange(page + 2)}>{page + 2}</div>}
            {page < maxPage - 3 && <div className="pagination__btn"><FontAwesomeIcon icon={faEllipsis} /></div>}
            {page < maxPage - 2 && <div className="pagination__btn" onClick={() => handlePageChange(maxPage)}>{maxPage}</div>}

            {page !== Math.ceil(amount / limit) && <div className="pagination__btn pagination__btn--large" onClick={() => handlePageChange(page + 1)}><FontAwesomeIcon icon={faAngleRight} /></div>}
        </div>
    );
};