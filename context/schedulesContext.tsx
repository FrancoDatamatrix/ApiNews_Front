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

interface Schedule {
  _id: {
    $oid: string;
  };
  hora: string;
  tema: string;
  palabras: string;
  lugar: string;
}

interface ScheduleContextType {
  schedules: Schedule[];
  scheduleloading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setMsg: (msg: string | null) => void;
  setSchedules: (schedules: Schedule[] | []) => void;
  msg: string | null;
  fetchSchedules: () => Promise<void>;
  fetchCreateSchedule: (
    hora: string,
    palabra: string,
    tema: string,
    lugar?: string
  ) => Promise<void>;
  fetchUpdateSchedule: (scheduledata: {
    id: string;
    hora?: string;
    palabra?: string;
    tema?: string;
    lugar?: string;
  }) => Promise<void>;
  fetchDeleteSchedule: (id: string) => Promise<void>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleloading, setScheduleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const server = "http://localhost:5000/api/v1/schedule";
  const { localUser, isAuthenticated, logout } = useAuth();
  const { users, fetchUsers, fetchDeleteUsers } = UseUser();
  const router = useRouter();

  useEffect(() => {
    // if (isAuthenticated && localUser?.role === "admin") {
    //   fetchSchedules();
    // }
    return () => {
      setScheduleLoading(true);
    };
  }, [isAuthenticated]);

  const fetchSchedules = async (): Promise<void> => {
    if (!localUser) {
      return;
    }
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setScheduleLoading(true);

      const options: RequestInit = {
        method: "GET",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
      };

      const response = await fetch(server, options); // URL de la API protegida
      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data: Schedule[] = await response.json();
      setSchedules(data); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setScheduleLoading(false);
    }
  };

  const fetchCreateSchedule = async (
    hora: string,
    palabras: string,
    tema: string,
    lugar?: string
  ): Promise<void> => {
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setScheduleLoading(true);

      const options: RequestInit = {
        method: "POST",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify({
          hora: hora,
          palabras: palabras,
          tema: tema,
          lugar: lugar,
        }),
      };

      const response = await fetch(server, options); // URL de la API protegida

      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message);
      if (localUser?.role === "user") {
        fetchUsers(1);
      } else {
        fetchSchedules();
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setScheduleLoading(false);
    }
  };

  const fetchUpdateSchedule = async (scheduledata: {
    id: string;
    hora?: string;
    palabra?: string;
    tema?: string;
    lugar?: string;
  }): Promise<void> => {
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setScheduleLoading(true);

      const options: RequestInit = {
        method: "PUT",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify(scheduledata),
      };

      const response = await fetch(server, options); // URL de la API protegida

      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message); // Maneja la respuesta de la API
      if (localUser?.role === "user") {
        fetchUsers(1);
      } else {
        fetchSchedules();
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setScheduleLoading(false);
    }
  };

  const fetchDeleteSchedule = async (id: string): Promise<void> => {
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      setScheduleLoading(true);

      const options: RequestInit = {
        method: "DELETE",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      const response = await fetch(server, options); // URL de la API protegida

      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message); // Maneja la respuesta de la API
      if (localUser?.role === "user") {
        fetchUsers(1);
      } else {
        fetchSchedules();
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setScheduleLoading(false);
    }
  };

  const value: ScheduleContextType = {
    schedules,
    scheduleloading,
    error,
    setError,
    setSchedules,
    msg,
    setMsg,
    fetchSchedules,
    fetchCreateSchedule,
    fetchUpdateSchedule,
    fetchDeleteSchedule,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const UseSchedule = (): ScheduleContextType => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
