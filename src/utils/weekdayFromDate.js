export const getWeekTextDay = (datetimeArray) => {
  if (!Array.isArray(datetimeArray)) return [];

  return datetimeArray.map((item) => {
    const date = new Date(item.date);
    return (
      date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() + '-' + date.getDate()
    );
  });
};
