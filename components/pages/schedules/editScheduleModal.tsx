"use client";
import React, { useState, ChangeEvent, useEffect } from "react";

interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scheduleData: ScheduleData) => void;
  initialData: ScheduleData;
}

interface ScheduleData {
  id: string;
  hora: string;
  palabras: string;
  tema: string;
  lugar: string;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>(initialData);

  useEffect(() => {
    setScheduleData(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleSave = () => {
    onSave(scheduleData);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg flex shadow-lg w-full max-w-md">
        <div className="flex flex-col">
          <div className="bg-black w-1/6 p-8 rounded-l-lg h-full"></div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-black font-semibold mb-4">Schedule</h2>

          <form className="text-black">
            <div className="divide-y">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  hora
                </label>
                <input
                  type="text"
                  name="hora"
                  value={scheduleData.hora}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  palabras
                </label>
                <input
                  type="text"
                  name="palabras"
                  value={scheduleData.palabras}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  tema
                </label>
                <input
                  type="text"
                  name="tema"
                  value={scheduleData.tema}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  lugar
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={scheduleData.lugar}
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

export default EditScheduleModal;
