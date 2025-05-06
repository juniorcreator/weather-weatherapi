export const getTimezoneTime = (zone) => {
  let timezoneOffsetInMilliseconds = zone * 1000;
  let nowUtc = new Date(Date.now());
  const cityTime = new Date(nowUtc.getTime() + timezoneOffsetInMilliseconds);
  return cityTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
};
