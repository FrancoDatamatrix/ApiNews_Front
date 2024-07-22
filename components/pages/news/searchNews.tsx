"use client";

import React, { useState } from "react";
import { UseNews } from "@/context/newsContext";
import { ArrowDownTrayIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface SearchNewsProps {
  downloadJSON: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setPage: (page: number) => void;
  stackNews: (page: number) => void;
}

const SearchNews: React.FC<SearchNewsProps> = ({
  downloadJSON,
  setPage,
  stackNews,
}) => {
  const { fetchFilterNews,setQuery,query } = UseNews();
  

  const handleSearch = () => {
    fetchFilterNews(query);
    setPage(1);
    stackNews(1)
  };

  return (
    <div className="flex items-center space-x-2 mt-10">
      <div className="relative flex items-center w-2/3">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-l-lg text-black px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-black px-4 py-2 rounded-r-lg"
        >
          <MagnifyingGlassIcon className="h-6" />
        </button>
      </div>
      <div>
        <button
          onClick={downloadJSON}
          className="bg-black text-white px-2 rounded flex items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <ArrowDownTrayIcon className="h-8 py-2" />
          <p className="text-sm ml-2">Descargar todo</p>
        </button>
      </div>
    </div>
  );
};

export default SearchNews;
