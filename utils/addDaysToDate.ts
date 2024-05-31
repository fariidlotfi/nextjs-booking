export function addDaysToDate(dateString: string, daysToAdd: number): string {
  const date = new Date(dateString);
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + daysToAdd);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
