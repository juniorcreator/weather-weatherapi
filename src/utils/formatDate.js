export const formatDate = (timestamp, text) => {
  const data = timestamp + 10800; // = 1747008000
  const date = new Date(data * 1000); // в миллисекундах
  console.log(date.toString(), text);
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

export const formatTextDateDt = (
  dt,
  timezoneOffset = 0,
  week = 'short',
  month = 'short',
  lang = 'en',
) => {
  const timestamp = (dt + timezoneOffset) * 1000; // Перевод в миллисекунды с учётом offset
  const date = new Date(timestamp);

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

export const formatSunsetTimeDt = (unixTime, timezoneOffset = 0) => {
  const date = new Date((unixTime + timezoneOffset) * 1000);

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const getLocalTimeNow = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
