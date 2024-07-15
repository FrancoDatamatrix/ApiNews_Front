"use client";

import React, { Suspense, useEffect, useState } from "react";
import { UseUser } from "@/context/usersContext";
import { useAuth } from "@/context/authContext";
import { UseSchedule } from "@/context/schedulesContext";
import { useRouter } from "next/navigation";
import ScheduleItem from "./scheduleItem";
import convertSecondsTo24HourFormat from "./convertSecondsTo24Hour";
import EditScheduleModal from "./editScheduleModal";
import SkeletonScheduleItem from "./skeletonScheduleItem";

interface ScheduleData {
  id: string;
  hora: string;
  palabras: string;
  tema: string;
  lugar: string;
}

const ScheduleList: React.FC = () => {
  const { users, fetchUsers, loading } = UseUser();
  const { localUser, isAuthenticated } = useAuth();
  const {
    schedules,
    fetchSchedules,
    fetchCreateSchedule,
    setSchedules,
    scheduleloading,
  } = UseSchedule();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const colors = ["bg-fuchsia-600", "bg-green-600", "bg-blue-600"];

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <SkeletonScheduleItem key={index} />
    ));
  };

  const handleCreateSchedule = (scheduleData: ScheduleData) => {
    fetchCreateSchedule(
      scheduleData.hora,
      scheduleData.palabras,
      scheduleData.tema,
      scheduleData.lugar
    );
    // fetchUsers();
    // fetchSchedules()
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const initialData: ScheduleData = {
    id: "",
    hora: "",
    palabras: "",
    tema: "",
    lugar: "",
  };

  useEffect(() => {
    if (isAuthenticated && localUser && localUser.role === "admin") {
      fetchSchedules();
    } else {
      fetchUsers(1);
    }
    return () => {
      setSchedules([]);
    };
  }, [isAuthenticated]);

  return (
    <div className="p-4 mt-20 mr-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex border rounded-lg text-black h-64 shadow-md">
          <div className="bg-black w-1/6 p-8 h-full rounded-l-lg"></div>
          <div className="flex items-center justify-center w-full font-sans text-xl hover:rounded-r-lg hover:bg-black hover:text-white transition duration-200 ease-in">
            <button
              onClick={() => handleOpenModal()}
              className="flex flex-col items-center"
            >
              <div className="text-5xl">+</div>
              <div>Crear schedule</div>
            </button>
          </div>
        </div>

        <EditScheduleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleCreateSchedule}
          initialData={initialData}
        />

        {localUser?.role === "admin" && !scheduleloading
          ? schedules.length > 0 &&
            schedules?.map((schedule, i) => (
              <div key={schedule._id.$oid}>
                <ScheduleItem
                  id={schedule._id.$oid}
                  hora={schedule.hora}
                  tema={schedule.tema}
                  palabras={schedule.palabras}
                  pais={schedule.lugar}
                  color={colors[i % colors.length]}
                />
              </div>
            ))
          : renderSkeletons(5)
          ? !loading
            ? users.length > 0 &&
              users[0]?.schedules?.map((schedule, i) => (
                <div key={schedule._id.$oid}>
                  <ScheduleItem
                    id={schedule._id.$oid}
                    hora={schedule.hora}
                    tema={schedule.tema}
                    palabras={schedule.palabras}
                    pais={schedule.lugar}
                    color={colors[i % colors.length]}
                  />
                </div>
              ))
            : renderSkeletons(5)
          : renderSkeletons(5)}
      </div>
    </div>
  );
};

export default ScheduleList;
