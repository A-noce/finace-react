export const convertSecondsInHours = (time: number) => {
  const hour = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = time % 60;

  return `${hour.toString().padStart(2, "0")}
  :${minutes.toString().padStart(2, "0")}
    :${seconds.toString().padStart(2, "0")}`;
};

export const getCurrentHour = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const convertToCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(value);
}