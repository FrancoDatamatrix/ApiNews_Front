"use client";

import React, { Suspense, useEffect, useState } from "react";
import { UseUser } from "@/context/usersContext";
import { useAuth } from "@/context/authContext";
import { UseNews } from "@/context/newsContext";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
import NewsItem from "./newsItem";
import SearchNews from "./searchNews";
import Pagination from "@/components/common/pagination";
import SkeletonNewsItem from "./skeletonNewsItem";
import DeleteModal from "@/components/common/deleteModal";

const NewsList: React.FC = () => {
  const { users } = UseUser();
  const { localUser, isAuthenticated } = useAuth();
  const { news, fetchNews, fetchDeleteNews, newsloading, query, fetchFilterNews,setQuery } = UseNews();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNews, setCurrentNews] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemsPerPage] = useState(10);
  const [flattenedNews, setFlattenedNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Estado para "Seleccionar todos"
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (Array.isArray(news) && news.length > 0) {
      const allNews = news.flatMap((group: any) => {
        return group.news.map((item: any) => {
          const newItem = {
            ...item,
            groupId: group._id.$oid,
            usuarioId: group.usuario_id.$oid,
            tema: group.tema,
            palabra: group.palabra,
            timestamp: group.timestamp.$date
          };
          return newItem;
        });
      });
      setFlattenedNews(allNews);
    } else {
      setFlattenedNews([]);
    }
    if (news.length <= 0) {
      setCurrentNews(1);
      setQuery("")
    }
  }, [news, localUser, users]);

  useEffect(() => {
    setSelectedNews([]);
    setSelectAllChecked(false);
  }, [currentNews]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flattenedNews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const PaginateNews = (pageNumber: number) => {
    // const nextNews = currentNews + 1;
    setCurrentNews(pageNumber);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleCheckboxChange = (newsId: string, groupId: string) => {
    const combinedId = `${groupId}-${newsId}`;
    setSelectedNews((prevSelectedNews) => {
      if (prevSelectedNews.includes(combinedId)) {
        return prevSelectedNews.filter((id) => id !== combinedId);
      } else {
        return [...prevSelectedNews, combinedId];
      }
    });
  };

  const handleDeleteNews = () => {
    fetchDeleteNews(selectedNews);
    setDeleteModalOpen(false);
  };

  const downloadSelectedJSON = () => {
    const selectedNewsItems = flattenedNews.filter((newsItem) =>
      selectedNews.includes(`${newsItem.groupId}-${newsItem._id}`)
    );
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(selectedNewsItems)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "news.json";
    link.click();
  };

  const downloadJSON = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const dataStr = JSON.stringify(news, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "news.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Función para manejar el cambio en "Seleccionar todos"
  const handleSelectAllChange = () => {
    const newSelectedNews = selectAllChecked
      ? [] // Si está marcado "Seleccionar todos", desmarcar todos los checkboxes
      : flattenedNews.map((item) => `${item.groupId}-${item._id}`); // Marcar todos los checkboxes

    setSelectedNews(newSelectedNews);
    setSelectAllChecked(!selectAllChecked); // Cambiar el estado de "Seleccionar todos"
  };

    return (
      <>
        <SearchNews
          downloadJSON={downloadJSON}
          setPage={paginate}
          stackNews={PaginateNews}
        />
        <div className="text-black">
          <div className="flex ">
            <div className="flex" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
                className="mr-2"
                style={{ accentColor: "black" }}
              />
              <label className="text-sm">Seleccionar todos</label>
            </div>
            <div className="flex justify-end w-1/2 m-4 ml-32 item-center">
              <button
                onClick={downloadSelectedJSON}
                className=" text-white bg-black w-8 rounded p-1 m-2"
              >
                <ArrowDownTrayIcon />
              </button>
              <button
                onClick={handleOpenDeleteModal}
                className=" text-white bg-black w-8 rounded p-1 m-2"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            deleteFunc={handleDeleteNews}
          />

          {newsloading ? (
            <div>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div key={index} className="p-4 m-2 bg-gray-100 rounded w-2/3 ">
                  <SkeletonNewsItem />
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            currentItems?.map((e: any) => (
              <div key={e._id} className="flex" style={{ alignItems: "start" }}>
                <input
                  type="checkbox"
                  checked={selectedNews.includes(`${e.groupId}-${e._id}`)}
                  onChange={(ev) => handleCheckboxChange(e._id, e.groupId)}
                  className="mr-3 mt-7"
                  style={{ accentColor: "black" }}
                />
                <div className="p-4 m-2 bg-gray-100 rounded w-2/3 ">
                  <NewsItem
                    image={
                      e.pagemap.cse_image
                        ? e.pagemap?.cse_image[0]?.src
                        : e.pagemap?.imageobject
                    }
                    title={e.title}
                    link={e.link}
                    snippet={e.snippet}
                    timestamp={e.timestamp}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center w-2/3">
              <p className="text-xl font-sans">No se han encontrado noticias</p>
              <button
                className="m-2 px-4 py-2 border rounded text-black border-black hover:bg-black hover:text-white"
                onClick={() => {fetchNews(), setCurrentNews(1);}}
              >
                Recargar
              </button>
            </div>
          )}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={flattenedNews.length}
          paginate={paginate}
          PaginateNews={PaginateNews}
          currentPage={currentPage}
          currentNews={currentNews}
          fetchNews={fetchFilterNews}
          query={query}
        />
      </>
    );
};

export default NewsList;
