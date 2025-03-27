import React, { useEffect, useState } from 'react';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import type { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;

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

interface ADatePickerProps extends RangePickerProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

const ADatePicker: React.FC<ADatePickerProps> = ({
  onDateChange,
  ...props
}) => {
  const today = dayjs().startOf('day');
  const defaultRange = getRange(90, 'day');
  const maxDate = today.subtract(91, 'day');

  const initialStartDate = defaultRange[0].format(DATE_SLASH_FORMAT_DDMMYYYY);
  const initialEndDate = defaultRange[1].format(DATE_SLASH_FORMAT_DDMMYYYY);

  const [dates, setDates] = useState<[string, string]>([
    initialStartDate,
    initialEndDate,
  ]);

  const onRangeChange = (dateValues: null | (Dayjs | null)[]) => {
    if (dateValues && dateValues[0] && dateValues[1]) {
      const newStartDate = dayjs(dateValues[0]).format(
        DATE_SLASH_FORMAT_DDMMYYYY,
      );
      const newEndDate = dayjs(dateValues[1]).format(
        DATE_SLASH_FORMAT_DDMMYYYY,
      );

      setDates([newStartDate, newEndDate]);

      onDateChange(newStartDate, newEndDate);
    }
  };

  useEffect(() => {
    onDateChange(dates[0], dates[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabledDate = (current: Dayjs) => {
    if (!current) return false;
    return current < maxDate || current > today.subtract(1, 'day');
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        presets={rangePresets}
        onChange={onRangeChange}
        disabledDate={disabledDate}
        defaultValue={defaultRange}
        style={{ width: '250px' }}
        format={{ format: DATE_SLASH_FORMAT_DDMMYYYY }}
        size="large"
        {...props}
      />
    </Space>
  );
};

export default ADatePicker;
