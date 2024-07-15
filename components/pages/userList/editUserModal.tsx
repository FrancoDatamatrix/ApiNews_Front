"use client";
import React, { useState, ChangeEvent, useEffect } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UserData) => void;
  initialData: UserData;
}

interface UserData {
  id: string;
  usuario: string;
  rol: string;
  lugar?: string;
  palabras?:string
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [userData, setUserData] = useState<UserData>(initialData);

  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    onSave(userData);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg flex shadow-lg w-full max-w-md">
        <div className="flex flex-col">
          <div className="bg-black w-1/6 p-8 rounded-l-lg h-full"></div>
        </div>
        <div className="p-4 w-full mt-3">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Informacion de usuario
          </h2>

          <form className="text-black">
            <div className="divide-y">
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  value={userData.usuario}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="text"
                  name="contraseña"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="rol"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol
                </label>
                <select
                  name="rol"
                  value={userData.rol}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Lugar
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={userData.lugar}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Palabras
                </label>
                <input
                  type="text"
                  name="palabras"
                  value={userData.palabras}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="m-2 w-36 px-4 py-2 border rounded text-black border-black hover:bg-black hover:text-white"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="m-2 px-4 py-2 border rounded text-black border-black hover:bg-black hover:text-white"
                onClick={handleSave}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
