export default function (timestamp: Date | string | number): boolean {
  const givenDate = new Date(timestamp);
  const lastWeek = new Date();

  lastWeek.setDate(lastWeek.getDate() - 7);

  lastWeek.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  return givenDate >= lastWeek;
}
