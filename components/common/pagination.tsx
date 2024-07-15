import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  PaginateNews: () => void;
  currentPage: number;
  currentNews: number;
  fetchNews: (page: number) => void;
  
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  PaginateNews,
  currentPage,
  currentNews,
  fetchNews,
  
}) => {
  const pageNumbers = [];

  const nextNews = () => {
    fetchNews(currentNews);
    PaginateNews();
    paginate(1);
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="py-2 px-4 rounded"
            >
              {number}
            </button>
          </li>
        ))}
        {pageNumbers.length > 0 && (
          <button onClick={nextNews} className="bg-black p-2 rounded">
            Ver mas noticias
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
