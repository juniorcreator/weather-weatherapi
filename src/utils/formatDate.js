export const formatDate = (dt) => {
  const date = new Date(dt * 1000);

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

export const formatTextDate = (dt, week = 'short', month = 'short', lang) => {
  const date = new Date(dt); // dt —'2025-05-06'
  // console.log(lang, ' lang in formatTextDate');

  return date.toLocaleDateString(lang, {
    weekday: week,
    day: 'numeric',
    month: month,
  });
};

export const formatSunsetTime = (timeStr) => {
  const [time, modifier] = timeStr.trim().split(' '); // разделяем на "8:22" и "PM"
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
