import {
  DATE_SLASH_FORMAT_DDMMYYYY,
  DATE_SLASH_FORMAT_DDMMYYYY_HHMMSS,
} from '@constants/dateFormat';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatDate = (
  date: string = dayjs().format(DATE_SLASH_FORMAT_DDMMYYYY_HHMMSS),
  outputFormat: string = DATE_SLASH_FORMAT_DDMMYYYY,
  inputFormat: string = DATE_SLASH_FORMAT_DDMMYYYY_HHMMSS,
): string => {
  return dayjs(date, inputFormat).format(outputFormat);
};

export const stringToDayjs = (
  date: string,
  format: string = DATE_SLASH_FORMAT_DDMMYYYY,
): dayjs.Dayjs => {
  return dayjs(date, format);
};

export const dayjsToString = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateObj: any,
  format: string = DATE_SLASH_FORMAT_DDMMYYYY,
): string | undefined => {
  const { $y: year, $M: month, $D: day, $isDayjsObject } = dateObj ?? {};
  return $isDayjsObject
    ? dayjs(`${year}-${month + 1}-${day}`).format(format)
    : undefined;
};
