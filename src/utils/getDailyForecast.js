export const getDailyForecasts = (list) => {
  const daily = [];
  const seenDates = new Set();

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const todayItems = list.filter((item) => {
    const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
    return itemDate === today;
  });

  if (todayItems.length) {
    const closest = todayItems.reduce((a, b) => {
      const aDiff = Math.abs(new Date(a.dt * 1000) - now);
      const bDiff = Math.abs(new Date(b.dt * 1000) - now);
      return aDiff < bDiff ? a : b;
    });
    daily.push(closest);
    seenDates.add(today);
  }

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split('T')[0];
    const hours = date.getHours();

    if (!seenDates.has(day) && hours === 12) {
      daily.push(item);
      seenDates.add(day);
    }

    if (daily.length === 5) break;
  }
  console.log(daily, ' daily');
  return daily;
};
