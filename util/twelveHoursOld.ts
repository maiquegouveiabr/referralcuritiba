export default (timestamp: number): boolean => {
  const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;
  return Date.now() - timestamp >= TWELVE_HOURS_IN_MS;
};
