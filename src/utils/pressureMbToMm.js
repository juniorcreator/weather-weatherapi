export const pressureMbToMm = (pressureMb) => {
  const conversionFactor = 0.75006375541921;
  return Math.round(pressureMb * conversionFactor);
};
