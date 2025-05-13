export const getWeekTextDayDt = (datetimeArray, timezoneOffset = 0) => {
  if (!Array.isArray(datetimeArray)) return [];

  return datetimeArray.map((item) => {
    const timestamp = (item.dt + timezoneOffset) * 1000;
    const date = new Date(timestamp);

    return (
      date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() + '-' + date.getDate()
    );
  });
};
