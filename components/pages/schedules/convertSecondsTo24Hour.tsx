const convertSecondsTo24HourFormat = (seconds: number): string => {
  // Calcular la hora y formatearla para que siempre tenga dos dígitos
  let hour: string | number = Math.floor(seconds / 3600);
  hour = hour < 10 ? "0" + hour : hour.toString();

  // Calcular los minutos y formatearlos para que siempre tengan dos dígitos
  let minute: string | number = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute.toString();

  return `${hour}:${minute}`;
};

export default convertSecondsTo24HourFormat;
