"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import ImagePlaceholder from "@/components/common/imagePlaceHolder";
import style from "./loginForm.module.css"

const LoginForm: React.FC = () => {
  const { login, error, setError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showpwd, setShowpwd] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push(`/`);
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      setError(null); // Limpiar el error si hay uno presente al enviar el formulario nuevamente
    }
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-9">
        <div className="max-w-lg w-full bg-white mb-20">
          <div className="mb-8 -ml-10">
            <Image src="/ARCHIVOTRANSPARENTE-GRANDE.png" alt="logoIdinnov" width={300} height={100} />
          </div>
          <h2 className="text-4xl font-bold text-start mb-4 text-gray-900">
            Iniciar sesión
          </h2>
          <p className="text-start text-gray-500 mb-6">
            Inicie sesión para acceder a su cuenta de IDINNOV
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 text-gray-500 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-500"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type={showpwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full text-gray-500 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-500"
              />
              <div onClick={() => setShowpwd(!showpwd)}>
                {showpwd ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className={`${style.icon} size-6 flex absolute`}
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className={`${style.icon} size-6 flex absolute`}
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-yellow-600 hover:text-yellow-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 flex justify-start items-center bg-white">
        <div className="w-3/4 text-center">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/013/149/674/non_2x/unavailable-image-icon-in-trendy-flat-style-isolated-on-white-background-photo-gallery-symbol-for-web-and-mobile-apps-free-vector.jpg"
            alt="Imagen relacionada a la empresa"
            width={800}
            height={800}
            style={{ border: "1px solid red" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
