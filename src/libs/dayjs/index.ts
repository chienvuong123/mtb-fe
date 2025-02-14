import {
  DATE_SLASH_FORMAT,
  DATE_SLASH_REVERT_FORMAT,
} from '@constants/dateFormat';
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const toValidDayjsString = (
  date: string,
  format: string = DATE_SLASH_REVERT_FORMAT,
): string => {
  return dayjs(date, format).format(DATE_SLASH_FORMAT);
};

export const stringToDayjs = (
  date: string,
  format: string = DATE_SLASH_REVERT_FORMAT,
): dayjs.Dayjs => {
  return dayjs(dayjs(date, format));
};

export const dayjsToString = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateObj: any,
  format: string = DATE_SLASH_REVERT_FORMAT,
): string | undefined => {
  const { $y: year, $M: month, $D: day, $isDayjsObject } = dateObj ?? {};
  return $isDayjsObject
    ? dayjs(`${year}-${month + 1}-${day}`).format(format)
    : undefined;
};
