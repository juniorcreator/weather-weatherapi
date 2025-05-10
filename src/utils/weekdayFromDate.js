export const getWeekTextDay = (datetimeArray) => {
  return datetimeArray.map((item) => {
    const date = new Date(item.date); // Пример: '2025-05-06'
    return (
      date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() + '-' + date.getDate()
    );
  });
};
