import React from "react";

interface PaginatorProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (pageInfo: { first: number; after: number | null }) => void;
}

const Pagination: React.FC<PaginatorProps> = ({
  totalCount,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / 10);

  const handlePageChange = (page: number) => {
    const first = 10;
    const after = (page - 1) * first;
    onPageChange({ first, after });
  };

  console.log(totalCount);

  return (
    <div сlassName="pagination">
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          onClick={() => handlePageChange(page + 1)}
          className={currentPage === page + 1 ? "active" : ""}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
