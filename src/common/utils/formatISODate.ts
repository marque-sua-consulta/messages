import { monthToNumberMap } from './montToNumberMap';
import * as moment from 'moment-timezone';

export function formatISODate(
  year: number,
  month: string,
  day: number,
): string {
  const date = moment.tz(
    `${year}-${monthToNumberMap[month]}-${day}`,
    'YYYY-M-D',
    'America/Sao_Paulo',
  );
  return date.format();
}
