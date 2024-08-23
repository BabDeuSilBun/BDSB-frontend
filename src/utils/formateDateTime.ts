export function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);

  const year = String(date.getFullYear()); // 연도
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
  const day = String(date.getDate()).padStart(2, '0'); // 일
  const hours = String(date.getHours()).padStart(2, '0'); // 시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

  // 날짜 (YY.MM.DD 형식)
  const formattedFullDate = `${year}.${month}.${day}`;

  // 날짜 (MM.DD 형식)
  const formattedMonthDay = `${month}.${day}`;

  // 시간 (HH:MM 형식)
  const formattedTime = `${hours}:${minutes}`;

  return { formattedFullDate, formattedMonthDay, formattedTime };
}
