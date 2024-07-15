"use client";

import React, { useEffect, useState } from "react";
import { useCron } from "@/context/cronContext";
import { useAuth } from "@/context/authContext";

interface TimeSelectProps {
  label: string;
  value: string;
  options: (number | string)[];
  selectedOption: string;
  onValueChange: (newValue: string) => void;
  onOptionChange: (newOption: string) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  label,
  value,
  options,
  selectedOption,
  onValueChange,
  onOptionChange,
}) => {
  return (
    <div className="mb-2 mt-4 flex items-center justify-between w-full ">
      <label className="block text-gray-700 text-sm font-bold">
        {label}
      </label>
      <div className="flex items-center mt-5 space-x-2">
        <select
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="shadow appearance-none border rounded w-11 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-26"
        >
          {options.map((option) => (
            <option key={option.toString()} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={selectedOption}
          onChange={(e) => onOptionChange(e.target.value)}
          className="shadow appearance-none border rounded w-11 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-26"
        >
          {options.map((option) => (
            <option key={option.toString()} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const generateOptions = (start: number, end: number): (number | string)[] => {
  const options: (number | string)[] = ["*"];
  for (let i = start; i <= end; i++) {
    options.push(i);
  }
  return options;
};

const CrontabConfig: React.FC = () => {
  const {
    crontab,
    fetchCrontab,
    fetchUpdateCrontab,
    cronLoading,
    error,
    setError,
  } = useCron();
  const { localUser, isAuthenticated } = useAuth();
  const hourOptions = generateOptions(0, 23);
  const dayOptions = generateOptions(0, 31);
  const monthOptions = generateOptions(1, 12);
  const dayOfWeekOptions = generateOptions(0, 7);

  const [hours, setHours] = useState<string>("*");
  const [selectedHour, setSelectedHour] = useState<string>("*");

  const [days, setDays] = useState<string>("*");
  const [selectedDays, setSelectedDays] = useState<string>("*");

  const [months, setMonths] = useState<string>("*");
  const [selectedMonth, setSelectedMonth] = useState<string>("*");

  const [daysOfWeek, setDaysOfWeek] = useState<string>("*");
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string>("*");

  useEffect(() => {
    if (isAuthenticated) fetchCrontab();
    if (error) setError(null);
    return () => {};
  }, [isAuthenticated]);


  const convertCronFormat = (arg1: string, arg2: string) => {
    return arg1 === "*"
      ? arg2 === "*"
        ? arg1
        : `${arg1}/${arg2}`
      : arg2 === "*"
      ? arg1
      : `${arg1}-${arg2}`;
  };

  const handleSave = () => {
    const cronParts = {
      horas: [hours, selectedHour],
      dias: [days, selectedDays],
      meses: [months, selectedMonth],
      dias_de_la_semana: [daysOfWeek, selectedDayOfWeek],
    };

    const UpdateCrontab = Object.fromEntries(
      Object.entries(cronParts).map(([key, [arg1, arg2]]) => [
        key,
        convertCronFormat(arg1, arg2),
      ])
    );

    console.log(UpdateCrontab);

    fetchUpdateCrontab(UpdateCrontab);
  };

  if (cronLoading) return <p className="text-red-900">Loading...</p>;
  return (
    <>
      <div className="max-w-full p-8 text-black">
        <h2 className="text-2xl font-bold mb-6">
          Su Cronjob actual se ejecuta con los siguientes parametros
        </h2>
        <div className="flex flex-row m-4">
          <p className="m-4">Minutos: {crontab?.minute}</p>
          <p className="m-4">Horas: {crontab?.hour}</p>
          <p className="m-4">Dias: {crontab?.day_of_month}</p>
          <p className="m-4">Meses: {crontab?.month}</p>
          <p className="m-4">Dias de la semana: {crontab?.day_of_week}</p>
        </div>
        <div className="flex w-2/5 rounded shadow">
          <div className="flex flex-col">
            <div className="bg-black w-1/6 p-8 rounded-l-lg h-full"></div>
          </div>

          <div className="flex flex-col w-full p-9">
            <h1 className="mb-5 font-bold text-xl">Editar Crontab</h1>
            <div className="divide-y mt-2 mb-4">
              <TimeSelect
                label="Horas"
                value={hours}
                selectedOption={selectedHour}
                options={hourOptions}
                onValueChange={setHours}
                onOptionChange={setSelectedHour}
              />
              <TimeSelect
                label="Dias"
                value={days}
                selectedOption={selectedDays}
                options={dayOptions}
                onValueChange={setDays}
                onOptionChange={setSelectedDays}
              />
              <TimeSelect
                label="Meses"
                value={months}
                options={monthOptions}
                selectedOption={selectedMonth}
                onValueChange={setMonths}
                onOptionChange={setSelectedMonth}
              />
              <TimeSelect
                label="Días de la Semana"
                value={daysOfWeek}
                options={dayOfWeekOptions}
                selectedOption={selectedDayOfWeek}
                onValueChange={setDaysOfWeek}
                onOptionChange={setSelectedDayOfWeek}
              />
            </div>
            <div className="flex justify-start">
              <button
                onClick={handleSave}
                className="mt-5 px-4 py-2 border rounded text-black border-black hover:bg-black hover:text-white"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrontabConfig;
