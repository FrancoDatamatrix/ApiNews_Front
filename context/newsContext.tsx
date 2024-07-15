"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import { UseUser } from "./usersContext";

interface News {
  _id: {
    $oid: string;
  };
  tema: string;
  palabras: string;
  news: any[];
}

interface NewsContextType {
  news: News[];
  newsloading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setMsg: (msg: string | null) => void;
  setNews: (schedules: News[] | []) => void;
  msg: string | null;
  fetchNews: () => Promise<void>;
  fetchDeleteNews: (selectedNews: string[]) => Promise<void>;
  fetchFilterNews: (tema: string, id?: string, page?: number) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const [news, setNews] = useState<News[]>([]);
  const [newsloading, setNewsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const server = "http://localhost:5000/api/v1/news";
  const { localUser, isAuthenticated, logout } = useAuth();
  const { users, fetchUsers, fetchDeleteUsers } = UseUser();
  const router = useRouter();

  useEffect(() => {
    // if (isAuthenticated && localUser?.role === "admin") {
    //   fetchSchedules();
    // }
    return () => {
      setNewsLoading(true);
    };
  }, [isAuthenticated]);

  const fetchNews = async (page: number=1): Promise<void> => {
    if (!localUser) {
      return;
    }
    setNewsLoading(true);
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const options: RequestInit = {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
      };

      let url = server;

      if (localUser.role === "user") {
        const id = users[0]._id.$oid;
        url = `${server}?id=${id}&page=${page}`;
      } else {
        url = `${server}?page=${page}`;
      }

      const response = await fetch(url, options); // URL de la API protegida
      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data: News[] = await response.json();
      setNews(data); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchFilterNews = async (
    tema: string,
    id?: string,
    page?: number
  ): Promise<void> => {
    if (!localUser) {
      return;
    }
    setNewsLoading(true);
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const options: RequestInit = {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
      };

      const baseUrl = server;
      const params = new URLSearchParams();
      if (localUser.role === "user") id = users[0]._id.$oid
      if (id) params.append("id", id);
      if (tema) params.append("tema", tema);
      if (page) params.append("page", page.toString());

      const url = `${baseUrl}?${params.toString()}`;

      const response = await fetch(url, options); // URL de la API protegida
      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data: News[] = await response.json();
      setNews(data); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchDeleteNews = async (
    selectedNews: string[]
  ): Promise<void> => {
    setNewsLoading(true);
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const selectedNewsItems = selectedNews.map((id) => {
        const [groupId, newsId] = id.split("-");
        return { group_id: groupId, news_id: parseInt(newsId) };
      });


      const options: RequestInit = {
        method: "DELETE",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify({ selectedNews: selectedNewsItems }),
      };

      const response = await fetch(server, options); // URL de la API protegida

      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message);
      fetchNews()

      // // Remove the deleted news from local state
      // setNews((prevState) =>
      //   prevState.filter(
      //     (newsItem) =>
      //       console.log(newsItem)
      //   )
      // ); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const value: NewsContextType = {
    news,
    newsloading,
    error,
    setError,
    setNews,
    msg,
    setMsg,
    fetchNews,
    fetchDeleteNews,
    fetchFilterNews,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const UseNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
