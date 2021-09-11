import { Pagination, PageItem } from "react-bootstrap";

const PaginationCustom = ({ currentPage, fetchNewPosts, totalPages }) => {
  return (
    <Pagination style={{ fontSize: 21 }}>
      <Pagination.Prev
        disabled={currentPage <= 1}
        onClick={() => fetchNewPosts(currentPage - 1)}
      />

      {totalPages.map((num) => {
        return (
          <PageItem
            key={num.toString()}
            active={currentPage === num}
            onClick={(e) => fetchNewPosts(Number(e.target.outerText))}
          >
            {num}
          </PageItem>
        );
      })}

      <Pagination.Next
        disabled={currentPage === totalPages.length}
        onClick={() => fetchNewPosts(currentPage + 1)}
      />
    </Pagination>
  );
};

export default PaginationCustom;
