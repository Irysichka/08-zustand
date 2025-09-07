import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps{
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
    return (
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
              activeClassName={css.active}
        pageCount={pageCount}
            previousLabel="<"
            disabledClassName={css.disabled}
      />  
   ) 
}