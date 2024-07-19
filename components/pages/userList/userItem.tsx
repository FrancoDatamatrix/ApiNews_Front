"use client";
import React, { useEffect, useState } from "react";
import { UseUser } from "@/context/usersContext";
import { useAuth } from "@/context/authContext";
import Modal from "@/components/common/modal";
import { UserIcon } from "@heroicons/react/24/outline";
import EditUserModal from "./editUserModal";
import DeleteModal from "@/components/common/deleteModal";

interface UserData {
  id: string;
  usuario: string;
  rol: string;
  lugar?: string;
  palabras?: string;
}

const UserItem: React.FC<UserData> = ({
  id,
  usuario,
  rol,
  palabras,
  lugar,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [user, setuser] = useState<UserData[]>([]);
  const {
    fetchDeleteUsers,
    fetchUpdateUser,
  } = UseUser();
  const { localUser } = useAuth();

  const initialData = {
    id,
    usuario,
    rol,
    lugar,
    palabras,
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleSaveChanges = (userData: UserData) => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log(userData);
    setuser([...user, userData]);
    fetchUpdateUser(userData);
    setModalOpen(false);
  };

  const handleDeltedUsers = (user_id: string, usuario: string) => {
    fetchDeleteUsers(user_id, usuario);
    setDeleteModalOpen(false);
  };

  return (
    <div
      key={id}
      className="flex border rounded-lg shadow-md h-64 text-sm text-gray-600"
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-end">
          {localUser?.role === "admin" && (
            <Modal
              openModal={handleOpenModal}
              deleteFunc={handleOpenDeleteModal}
            />
          )}
        </div>
        <div className="flex flex-col items-center h-full justify-center">
          <UserIcon className="w-28" />
          <div className="text-gray-500 text-xl font-bold">{usuario}</div>
        </div>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        initialData={initialData}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        deleteFunc={() => handleDeltedUsers(id, usuario)}
      />
    </div>
  );
};

export default UserItem;