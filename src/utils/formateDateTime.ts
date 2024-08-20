export function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);

  // 날짜 (MM.DD 형식)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${month}.${day}`;

  // 시간 (HH:MM 형식)
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}
