import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import dayjs from 'dayjs';

export const getDateStringFromObj = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateObj: any,
  format?: string,
): string | undefined => {
  const { $y: year, $M: month, $D: day, $isDayjsObject } = dateObj ?? {};
  return $isDayjsObject
    ? dayjs(`${year}-${month + 1}${day}`).format(
        format ?? DATE_SLASH_FORMAT_DDMMYYYY,
      )
    : undefined;
};
