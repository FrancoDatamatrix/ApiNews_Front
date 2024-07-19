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

interface News {
  _id: {
    $oid: string;
  };
  tema: string;
  palabra: string;
  news: any[];
}

interface User {
  _id: {
    $oid: string;
  };
  usuario: string;
  contraseña: string;
  rol: string;
  lugar?: string;
  palabras?: string;
  schedules?: any[];
  news?: News | { error: string } | any;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setMsg: (msg: string | null) => void;
  setUsers: (Users: User[] | []) => void;
  msg: string | null;
  credentials: object | null;
  setCredentials: (credentials:object | null) => void;
  fetchUsers: (page: number) => Promise<void>;
  fetchCreateUsers: (
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  fetchUpdateUser: (updateData: {
    usuario: string;
    contraseña?: string;
    rol?: string;
    palabras?: string;
    lugar?: string;
  }) => Promise<void>;
  fetchDeleteUsers: (id: string, usuario: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<object | null>(null);
  const { localUser, logout } = useAuth();
  const server = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    // if (isAuthenticated) fetchUsers();
    return () => {
      setLoading(true);
      setUsers([]);
    };
  }, []);

  const fetchUsers = async (page: number = 1): Promise<void> => {
    if (!localUser) {
      return;
    }
    
    try {
      let url = "";
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setLoading(true);

      const options: RequestInit = {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
      };

      if (localUser.role === "admin") {
        url = `${server}/users`;
      } else {
        url = `${server}/users/${localUser.usuario}?page=${page}`;
      }
      const response = await fetch(url, options); // URL de la API protegida
      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data: User[] = await response.json();
      setUsers(data); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreateUsers = async (
    email: string,
    password: string,
    role: string
  ): Promise<void> => {
    
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setLoading(true);

      const options: RequestInit = {
        method: "POST",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify({
          usuario: email,
          contraseña: password,
          rol: role,
        }),
      };

      const response = await fetch(server + "/users", options); // URL de la API protegida

      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      if (!response.ok && response.status === 403) {
        throw new Error("Solo Administradores");
      }
      const data = await response.json();
      setMsg(data.message);
      setCredentials(data.credenciales_DB); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdateUser = async (updateData: {
    usuario: string;
    contraseña?: string;
    rol?: string;
    palabras?: string;
    lugar?: string;
  }): Promise<void> => {
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setLoading(true);

      const options: RequestInit = {
        method: "POST",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify(
          updateData,
        ),
      };

      const response = await fetch(server + "/users", options); // URL de la API protegida

      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      if (!response.ok && response.status === 403) {
        throw new Error("Solo Administradores");
      }
      const data = await response.json();
      setMsg(data.message); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteUsers = async (
    id: string,
    usuario: string
  ): Promise<void> => {
    try {
      let url = "";
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setLoading(true);

      const options: RequestInit = {
        method: "DELETE",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify({
          id: id,
          usuario: usuario,
        }),
      };

      const response = await fetch(server + "/users", options); // URL de la API protegida

      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message); // Maneja la respuesta de la API
      fetchUsers(1);
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: UserContextType = {
    users,
    loading,
    error,
    setError,
    setUsers,
    msg,
    credentials,
    setCredentials,
    setMsg,
    fetchUsers,
    fetchCreateUsers,
    fetchUpdateUser,
    fetchDeleteUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UseUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
