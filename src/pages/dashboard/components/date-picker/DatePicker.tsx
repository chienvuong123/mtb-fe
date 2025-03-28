import React, { useEffect, useState } from 'react';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker as AntdDatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import type { RangePickerProps } from 'antd/lib/date-picker';

const getRange = (
  amount: number,
  unit: dayjs.ManipulateType,
): [Dayjs, Dayjs] => {
  const end = dayjs().subtract(1, 'day').startOf('day');
  const start = end.subtract(amount, unit);
  return [start, end];
};

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '90 ngày gần nhất', value: getRange(90, 'day') },
  { label: '30 ngày gần nhất', value: getRange(30, 'day') },
  { label: '7 ngày gần nhất', value: getRange(7, 'day') },
];

interface DatePickerProps extends RangePickerProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

const defaultMaxDate = dayjs().startOf('day').subtract(1, 'day');
const defaultRange = getRange(90, 'day');
const defaultMinDate = defaultMaxDate.subtract(90, 'day');

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, ...props }) => {
  const [maxDate, setMaxDate] = useState<Dayjs>(defaultMaxDate);
  const [minDate, setMinDate] = useState<Dayjs>(defaultMinDate);
  const [value, setValue] =
    useState<[Dayjs | null, Dayjs | null]>(defaultRange);

  const onRangeChange = (dateValues: null | (Dayjs | null)[]) => {
    setValue(dateValues ? [dateValues[0], dateValues[1]] : [null, null]);
    setMaxDate(defaultMaxDate);
    setMinDate(defaultMinDate);
  };

  useEffect(() => {
    if (value[0] && value[1])
      onDateChange(
        value[0].format(DATE_SLASH_FORMAT_DDMMYYYY),
        value[1].format(DATE_SLASH_FORMAT_DDMMYYYY),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onCalendarChange = (
    dateValues: null | (Dayjs | null)[],
    _dateStrings: [string, string],
    { range }: { range?: 'start' | 'end' },
  ) => {
    if (range === 'end' && dateValues?.[1]) {
      setMaxDate(dateValues[1]);
    }
    if (range === 'start' && dateValues?.[0]) {
      setMinDate(dateValues[0]);
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <AntdDatePicker.RangePicker
        onCalendarChange={onCalendarChange}
        presets={rangePresets}
        onChange={onRangeChange}
        disabledDate={(current) =>
          current.isBefore(minDate) || current.isAfter(maxDate)
        }
        value={value}
        style={{ width: '250px' }}
        format={{ format: DATE_SLASH_FORMAT_DDMMYYYY }}
        size="large"
        {...props}
      />
    </Space>
  );
};

export default DatePicker;
