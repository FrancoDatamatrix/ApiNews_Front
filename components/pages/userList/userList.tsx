"use client";

import React, { useEffect, useState } from "react";
import { UseUser } from "@/context/usersContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import UserItem from "./userItem";
import SkeletonUserItem from "./skeletonUserItem";


interface UserData {
  id: string;
  usuario: string;
  contraseña: string;
  rol: string;
  lugar?: string;
  palabras?: string;
}

const UserList: React.FC = () => {
  const {
    users,
    loading,
    error,
    setError,
    fetchUsers,
  } = UseUser();
  const { localUser, isAuthenticated } = useAuth();
  const router = useRouter();

   const renderSkeletons = (count: number) => {
     return Array.from({ length: count }).map((_, index) => (
       <SkeletonUserItem key={index} />
     ));
   };

  useEffect(() => {
    if (isAuthenticated) fetchUsers(1);
    if (error) setError(null);
    return () => {};
  }, [isAuthenticated]);


  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-20 mr-32">
      {renderSkeletons(5)}
    </div>
  );
  if (error) return <p className="text-red-900">Error: {error}</p>;

  return (
    <div className="p-4 mt-20 mr-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localUser?.role === "admin" ? (
          <div className="flex text-xl items-center justify-center p-4 border rounded-lg text-black shadow-md hover:rounded-r-lg hover:bg-black hover:text-white transition duration-200 ease-in">
            <button
              onClick={() => router.push("/register")}
              className="flex flex-col items-center"
            >
              <div className="text-5xl">+</div>
              <div>Crear nuevo usuario</div>
            </button>
          </div>
        ) : null}

        {users?.map((u) => (
          <div key={u._id.$oid}>
            <UserItem
              id={u._id.$oid}
              usuario={u.usuario}
              rol={u.rol}
              palabras={u.palabras}
              lugar={u.lugar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
