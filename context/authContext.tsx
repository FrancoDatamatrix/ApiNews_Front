"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  localUser: any;
  isLoading: boolean;
  login: (usuario: string, contraseña: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [localUser, setLocalUser] = useState<any>("");
  const server = "http://localhost:5000/api/v1";
  const router = useRouter();

  useEffect(() => {
    const csrfToken = Cookies.get("csrf_access_token");
    if (csrfToken) {
      setIsAuthenticated(true);
    }
    const getUser = localStorage.getItem("user");
    const user = getUser ? JSON.parse(getUser) : null;
    setLocalUser(user);
    if (!isAuthenticated) setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (usuario: string, contraseña: string): Promise<void> => {
    try {
      const response = await fetch(server + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.usuario));
        setIsAuthenticated(true);
        setError(null);
      } else {
        setIsAuthenticated(false);
        setError(data.msg || "Error de servidor");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setIsAuthenticated(false);
      setError("Error de conexión");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch(server + "/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed", await response.text());
      }
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setError(null);
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    localUser,
    isLoading,
    login,
    logout,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
