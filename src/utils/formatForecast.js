export function formatForecast(forecastDays, curTime) {
  const currentTime = new Date(curTime).getTime();

  const formatted = forecastDays.map((day) => {
    const hours = day.hour;
    return {
      date: day.date,
      night: [hours[0], hours[3]],
      morning: [hours[6], hours[9]],
      day: [hours[12], hours[15]],
      evening: [hours[18], hours[21]],
    };
  });

  const today = formatted[0];

  let closestEntry = null;
  let minDiff = Infinity;

  ['night', 'morning', 'day', 'evening'].forEach((period) => {
    today[period].forEach((entry) => {
      const entryTime = new Date(entry.time).getTime();
      const diff = Math.abs(currentTime - entryTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestEntry = entry;
      }
    });
  });

  if (closestEntry) {
    closestEntry.active = true;
  }

  console.log(formatted, ' formatted');

  return formatted;
}
