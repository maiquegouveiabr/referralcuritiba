export default (timestamp: number, timeIncluded: boolean) => {
  const date = new Date(timestamp);
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  if (timeIncluded) {
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const hour = `${date.getHours()}`.padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minutes}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};
