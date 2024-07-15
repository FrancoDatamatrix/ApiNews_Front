import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteFunc: () => void;
}

const DeleteModal: React.FC<modalProps> = ({ isOpen, onClose, deleteFunc }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed flex justify-center inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full w-1/6 items-end justify-center text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-center">
                <div className="mt-1 text-center">
                  <p className="flex justify-center font-semibold leading-6 text-gray-900">
                    Una vez eliminado,
                  </p>
                  <p className="flex justify-center font-semibold leading-6 text-gray-900">
                    este archivo no se puede recuperar.
                  </p>
                  <p className="flex justify-center">¿deseas eliminarlo?</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center bg-gray-50 mb-4 px-4 py-3 sm:px-6">
              <button
                type="button"
                className="inline-flex rounded border border-black w-full justify-center px-3 py-2 font-semibold text-black shadow-sm hover:bg-black hover:text-white sm:ml-3 sm:w-auto"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inline-flex rounded w-full justify-center border border-black px-3 py-2 font-semibold text-black shadow-sm hover:bg-black hover:text-white sm:ml-3 sm:w-auto"
                onClick={deleteFunc}
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
