export const getWeekday = (datetimeArray) => {
  return datetimeArray.map((item) => {
    const date = new Date(item.dt * 1000); // преобразуем секунды в миллисекунды
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  });
};
