import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  PaginateNews: (pageNumber: number) => void;
  currentPage: number;
  currentNews: number;
  fetchNews: (tema: string, id?: string, page?: number) => void;
  query: string;
}

type PageType = number | string; // Define un tipo que puede ser número o cadena

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
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNeighbours = 5; // Número de páginas a mostrar a cada lado de la página actual
  const maxPagesToShow = pageNeighbours * 2 + 3; // Páginas totales a mostrar incluyendo actual, izquierda y derecha

  const nextNews = () => {
    fetchNews(query, "", currentNews + 1);
    PaginateNews(currentNews + 1);
    paginate(1);
  };

  const prevNews = () => {
    fetchNews(query, "", currentNews - 1);
    PaginateNews(currentNews - 1);
    paginate(1);
  };

  const generatePageNumbers = (): PageType[] => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftBound = Math.max(2, currentPage - pageNeighbours);
    const rightBound = Math.min(totalPages - 1, currentPage + pageNeighbours);
    const pages: PageType[] = [1];

    if (leftBound > 2) {
      pages.push("...");
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbersToDisplay = generatePageNumbers();

  return (
    <nav>
      <ul className="flex justify-center items-center space-x-1 w-2/3 m-4">
        {currentNews > 1 && (
          <button onClick={prevNews} className="bg-black p-2 rounded">
            Anterior Stack
          </button>
        )}
        {pageNumbersToDisplay.map((number, index) => (
          <li
            key={index}
            className={`page-item ${
              number === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {typeof number === "number" ? (
              <button onClick={() => paginate(number)} className="w-10 py-2">
                {number}
              </button>
            ) : (
              <div className="w-10 flex flex-col items-center">
                <span className="py-2">...</span>
              </div>
            )}
          </li>
        ))}
        {pageNumbersToDisplay.length > 0 && currentNews < totalPages && (
          <button onClick={nextNews} className="bg-black p-2 rounded">
            Siguiente Stack
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
