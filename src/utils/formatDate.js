export const formatDate = (dt) => {
  // Проверка: если dt — в секундах, умножаем на 1000
  const date = new Date(dt * 1000);

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};
