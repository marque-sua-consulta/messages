import { monthToNumberMap } from './montToNumberMap';
import * as moment from 'moment-timezone';

export function getUnixTimestamp(
  year: number,
  month: string,
  day: number,
): number {
  const date = moment.tz(
    `${year}-${monthToNumberMap[month]}-${day}`,
    'YYYY-M-D',
    'America/Sao_Paulo',
  );
  return date.unix();
}
