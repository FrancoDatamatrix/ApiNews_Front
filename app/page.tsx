"use client";
import React, { Suspense, useState } from "react";
import { useAuth } from "@/context/authContext";
import UserList from "../components/pages/userList/userList";
import ScheduleList from "@/components/pages/schedules/scheduleList";
import CrontabConfig from "@/components/pages/crontab/crontabConfig";
import NewsList from "@/components/pages/news/newsList";
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Logo from "../public/ARCHIVOTRANSPARENTE.png";

const AdminPanel: React.FC = () => {
  const { logout, localUser } = useAuth();
  const [activeComponent, setActiveComponent] = useState<string>("schedules");

  const handleClickLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "schedules":
        return <ScheduleList />;
      case "news":
        return <NewsList />;
      case "userInfo":
        return <UserList />;
      case "timer":
        return <CrontabConfig />;
      default:
        return <UserList />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-100 p-12">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="logoIdinnov"
              width={160}
              height={120}
              priority
            />
          </div>
          <div className="mt-20 flex flex-col items-center">
            <UserCircleIcon className="w-40 h-40 text-gray-300" />
            <p className="mt-2 text-black">{localUser?.usuario || "usuario"}</p>
          </div>
        </div>
        <ul className="space-y-1 text-black font-sans">
          <li>
            <button
              className={`w-full text-left p-4 ${
                activeComponent === "schedules" ? "bg-yellow-400 rounded" : ""
              }`}
              onClick={() => setActiveComponent("schedules")}
            >
              Schedules
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-4 ${
                activeComponent === "news" ? "bg-yellow-400 rounded" : ""
              }`}
              onClick={() => setActiveComponent("news")}
            >
              Noticias
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-4 ${
                activeComponent === "userInfo" ? "bg-yellow-400 rounded" : ""
              }`}
              onClick={() => setActiveComponent("userInfo")}
            >
              Actualizar información de usuario
            </button>
          </li>
          {localUser?.role == "admin" ? (
            <li>
              <button
                className={`w-full text-left p-4 ${
                  activeComponent === "timer" ? "bg-yellow-400 rounded" : ""
                }`}
                onClick={() => setActiveComponent("timer")}
              >
                Editar cronómetro
              </button>
            </li>
          ) : null}
          <li>
            <button
              onClick={handleClickLogout}
              className="w-full flex items-center text-left p-2 mt-20 text-red-600"
            >
              <ArrowRightStartOnRectangleIcon className="w-4 mr-2" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-white">
        <h2 className="text-2xl bg-black font-bold mb-4 pt-10 pl-7">
          Perfil de {localUser?.role}
        </h2>
        <div className="pl-5">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
