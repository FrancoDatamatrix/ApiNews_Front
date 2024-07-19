"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

interface Crontab {
  minute: string;
  hour: string;
  day_of_month: string;
  month: string;
  day_of_week: string;
}

interface CronContextType {
  crontab: Crontab[]| any;
  fetchCrontab: () => Promise<void>;
  cronLoading: boolean;
  msg: string | null;
  error: string | null;
  setError: (error: string | null) => void;
  fetchUpdateCrontab: (Crontab: {
    horas?: string;
    dias?: string;
    meses?: string;
    dias_de_la_semana?: string;
  }) => Promise<void>;
}

const CronContext = createContext<CronContextType | undefined>(undefined);

export const CronProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [crontab, setCrontab] = useState<Crontab[]>([]);
  const [cronLoading, setCronLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const { logout } = useAuth();
  const server = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {

    return () => {
      setCronLoading(true);
      setCrontab([]);
    };
  }, []);

  const fetchCrontab = async (): Promise<void> => {
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

      const response = await fetch(server + "/cronjob", options); // URL de la API protegida
      if (!response.ok && response.status === 401) {
        logout();
        router.push("/login");
        throw new Error("Error al realizar la solicitud");
      }

      const data: Crontab[] = await response.json();
      setCrontab(data); // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setCronLoading(false);
    }
  };

  const fetchUpdateCrontab = async (crondata: {
    horas?: string;
    dias?: string;
    meses?: string;
    dias_de_la_semana?: string;
  }): Promise<void> => {
    try {
      const csrfToken = Cookies.get("csrf_access_token"); // Obtener el token CSRF de las cookies

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const options: RequestInit = {
        method: "PUT",
        credentials: "include", // Incluir cookies en la solicitud
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Incluir el token CSRF en los encabezados
        },
        body: JSON.stringify(crondata),
      };

      const response = await fetch(server + "/cronjob", options); // URL de la API protegida

      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }

      const data = await response.json();
      setMsg(data.message);
      fetchCrontab() // Maneja la respuesta de la API
    } catch (error) {
      setError((error as Error).message);
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setCronLoading(false);
    }
  };

  const value: CronContextType = {
    crontab,
    fetchCrontab,
    fetchUpdateCrontab,
    cronLoading,
    msg,
    setError,
    error,
  };

  return <CronContext.Provider value={value}>{children}</CronContext.Provider>;
};

export const useCron = (): CronContextType => {
  const context = useContext(CronContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
