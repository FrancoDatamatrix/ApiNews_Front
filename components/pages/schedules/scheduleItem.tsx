"use client";

import React, { useState } from "react";
import { UseSchedule } from "@/context/schedulesContext";
import { UseUser } from "@/context/usersContext";
import convertSecondsTo24HourFormat from "./convertSecondsTo24Hour";
import EditScheduleModal from "./editScheduleModal";
import Modal from "@/components/common/modal";
import {
  ClockIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import DeleteModal from "@/components/common/deleteModal";

interface ScheduleItem {
  id: string;
  hora: string;
  tema: string;
  palabras: string;
  pais: string;
  color: string;
}

interface ScheduleData {
  id: string;
  hora: string;
  palabras: string;
  tema: string;
  lugar: string;
}

const ScheduleItem: React.FC<ScheduleItem> = ({
  id,
  hora,
  tema,
  palabras,
  pais,
  color,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const { fetchUpdateSchedule, fetchDeleteSchedule, fetchSchedules } =
    UseSchedule();
  const { fetchUsers } = UseUser();
  const HoursFormat = convertSecondsTo24HourFormat(parseInt(hora));

  const handleDeleteSchedule = (id: string) => {
    fetchDeleteSchedule(id);
    setDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = (scheduleData: ScheduleData) => {
    // Aquí puedes agregar la lógica para guardar los cambios
    setSchedules([...schedules, scheduleData]);
    fetchUpdateSchedule(scheduleData);
    setModalOpen(false);
  };

  const initialData: ScheduleData = {
    id: id,
    hora: HoursFormat,
    palabras,
    tema,
    lugar: pais,
  };

  return (
    <div className="flex border rounded-lg shadow-md h-64 text-sm text-gray-600">
      <div
        className={`${color} w-1/6 h-full rounded-l-lg text-white flex flex-col items-center justify-center`}
      >
        <ClockIcon className="w-6 mb-3" />
        <DocumentTextIcon className="w-6 mb-3" />
        <ChatBubbleLeftRightIcon className="w-6 mb-3" />
        <MapPinIcon className="w-6 mb-3" />
      </div>
      <div className="flex flex-col w-full ml-2 font-sans text-base">
        <div className="flex justify-end">
          <Modal
            openModal={handleOpenModal}
            deleteFunc={handleOpenDeleteModal}
          />
        </div>
        <div className="flex flex-col h-full mb-8 justify-center">
          <span className="flex mb-3">
            <p className="font-bold mr-1">Hora: </p> {HoursFormat}
          </span>
          <span className="flex mb-3">
            <p className="font-bold mr-1">Tema: </p> {tema}
          </span>
          <span className="flex mb-3">
            <p className="font-bold mr-1">Palabras ingresadas: </p>
            {palabras}
          </span>
          <span className="flex mb-3">
            <p className="font-bold mr-1">País: </p>
            {pais}
          </span>
        </div>

        <div className="flex flex-col">
          <EditScheduleModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveChanges}
            initialData={initialData}
          />
        </div>
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          deleteFunc={() => handleDeleteSchedule(id)}
        />
      </div>
    </div>
  );
};

export default ScheduleItem;
