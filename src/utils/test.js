export function formatForecast(forecastDays) {
  return forecastDays.map((day) => {
    const hours = day.hour;

    return {
      date: day.date, // Можно вернуть дату, если нужно отличать дни
      night: [hours[0], hours[3]],
      morning: [hours[6], hours[9]],
      day: [hours[12], hours[15]],
      evening: [hours[18], hours[21]],
    };
  });
}
