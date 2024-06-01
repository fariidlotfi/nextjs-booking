export function getAdjustedDate() {
  const currentDate = new Date();
  const timeDifference = (3 * 60 + 30) * 60 * 1000;
  const adjustedDate = new Date(currentDate.getTime() + timeDifference);
  return adjustedDate;
}
