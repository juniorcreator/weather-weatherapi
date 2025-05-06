export const getList = (list) => {
  const periodTargets = {
    night: 3,
    morning: 9,
    day: 15,
    evening: 21,
  };

  const periodRanges = {
    night: [0, 5],
    morning: [6, 9],
    day: [12, 15],
    evening: [18, 23],
  };

  const grouped = {};

  for (const item of list) {
    const localTime = new Date(item.dt_txt); // уже локальное время
    const hour = localTime.getHours();
    const dayKey = localTime.toISOString().split('T')[0];

    if (!grouped[dayKey]) {
      grouped[dayKey] = {
        night: null,
        morning: null,
        day: null,
        evening: null,
      };
    }

    for (const [period, [start, end]] of Object.entries(periodRanges)) {
      if (hour >= start && hour <= end) {
        const current = grouped[dayKey][period];
        const newDiff = Math.abs(hour - periodTargets[period]);
        const currentDiff = current
          ? Math.abs(new Date(current.dt_txt).getHours() - periodTargets[period])
          : Infinity;

        if (newDiff <= currentDiff) {
          grouped[dayKey][period] = item;
        }
      }
    }
  }
  console.log(
    Object.entries(grouped)
      .slice(0, 5)
      .map(([date, periods]) => ({
        date,
        ...periods,
      })),
  );
  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, periods]) => ({
      date,
      ...periods,
    }));
};
