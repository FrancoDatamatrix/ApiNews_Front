import { CheckCircleIcon,ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import React from "react";

interface modalProps {
  onClose: () => void;
  credentials: any;
  msg: string | null;
}

const Alert: React.FC<modalProps> = ({ onClose, credentials, msg }) => {
  const handleCopyToClipboard = () => {
    const textToCopy = `
      Usuario para la DB: ${credentials.db_username}
      Contraseña para la DB: ${credentials.db_password}
      Nombre de la DB: ${credentials.db_name}
    `;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Información copiada al portapapeles.");
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles: ", err);
      });
  };

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    {msg}
                  </h1>
                  <div className="mt-2 text-sm text-gray-500">
                    <p className="">
                      {`Usuario para la DB: ${credentials.db_username}`}
                    </p>
                    <p className="">
                      {`Contraseña para la DB: ${credentials.db_password}`}
                    </p>
                    <p className="">
                      {`Nombre de la DB: ${credentials.db_name}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                onClick={handleCopyToClipboard}
              >
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
