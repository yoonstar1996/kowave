export const formatTime24H = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0"); // 24시간제
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
