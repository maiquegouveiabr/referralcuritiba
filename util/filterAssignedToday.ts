export default function (timestamp: Date | string | number): boolean {
  const givenDate = new Date(timestamp);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  return givenDate >= today;
}
