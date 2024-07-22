import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  PaginateNews: (pageNumber: number) => void;
  currentPage: number;
  currentNews: number;
  fetchNews: (tema:string, id?:string, page?:number) => void;
  query:string
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  PaginateNews,
  currentPage,
  currentNews,
  fetchNews,
  query,
}) => {
  const pageNumbers = [];

  const nextNews = () => {
    console.log(currentNews);
    fetchNews(query,"",currentNews + 1);
    PaginateNews(currentNews + 1);
    paginate(1);
  };

  const prevNews = () => {
    fetchNews(query, "", currentNews - 1);
    PaginateNews(currentNews - 1);
    paginate(1);
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2 w-2/3 m-4">
        {currentNews > 1 && pageNumbers.length > 0 ? (
          <button onClick={prevNews} className="bg-black p-2 rounded">
            Anterior Stack
          </button>
        ) : null}
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
            Siguiente Stack
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
