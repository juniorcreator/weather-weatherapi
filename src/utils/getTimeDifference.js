export const getTimeDifference = (dt1, dt2) => {
  const diffInSeconds = Math.abs(dt2 - dt1);

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
  const seconds = diffInSeconds % 60;

  return { days, hours, minutes, seconds };
};
