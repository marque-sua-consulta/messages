export function getCurrentMonthShortName(): string {
  const months: string[] = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  return months[getCurrentMonth()];
}

export function getCurrentMonth(): number {
  const currentDate = new Date();
  return currentDate.getMonth() + 1; // getMonth() retorna de 0 a 11, então adicionamos 1
}

export function getCurrentYear(): number {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

export function formatUnixTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
