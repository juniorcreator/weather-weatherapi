export function formatLocalTime(timestamp, timezoneOffset) {
  if (
    typeof timestamp !== 'number' ||
    typeof timezoneOffset !== 'number' ||
    isNaN(timestamp) ||
    isNaN(timezoneOffset)
  ) {
    return '--:--';
  }

  try {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    return '--:--';
  }
}
