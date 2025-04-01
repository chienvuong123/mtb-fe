import { EStatusCampaign } from '@constants/masterData';
import type { TFormType } from '@types';
import type { AnyObject } from 'antd/es/_util/type';
import { useWatch } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import type { FormInstance } from 'rc-field-form';
import { useEffect, useMemo } from 'react';

type TRageDate = {
  startDate?: Dayjs;
  endDate?: Dayjs;
};

const generateStatusFromDate = ({
  startDate,
  endDate,
}: TRageDate): EStatusCampaign | undefined => {
  if (!startDate || !endDate) return undefined;

  const today = dayjs().startOf('day');
  const start = startDate.startOf('day');
  const end = endDate.startOf('day');

  if (today.isBefore(start)) return EStatusCampaign.PENDING;

  if (today.isAfter(end)) return EStatusCampaign.ENDED;

  return EStatusCampaign.INPROGRESS;
};

const useCampaignFormHelper = <T extends AnyObject>({
  form,
  initialValues,
  mode,
}: {
  form?: FormInstance;
  initialValues?: T | null;
  mode?: TFormType;
}) => {
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);

  const handleGenerateStatus = (dates: TRageDate) =>
    form?.setFieldValue('status', generateStatusFromDate(dates));

  const minStartDate = useMemo(() => {
    if (mode === 'add') return dayjs().add(1, 'day');
    if (mode === 'edit' && initialValues?.startDate)
      return dayjs(initialValues.startDate);
    return undefined;
  }, [mode, initialValues]);

  const maxStartDate = useMemo(() => {
    if (
      initialValues?.status === EStatusCampaign.INPROGRESS &&
      initialValues.startDate
    ) {
      return dayjs();
    }
    return endDate ? dayjs(endDate) : undefined;
  }, [initialValues?.status, initialValues?.startDate, endDate]);

  const minEndDate = useMemo(() => {
    if (
      initialValues?.status === EStatusCampaign.INPROGRESS &&
      initialValues.startDate
    ) {
      return dayjs();
    }
    return startDate ? dayjs(startDate) : minStartDate;
  }, [
    initialValues?.status,
    initialValues?.startDate,
    minStartDate,
    startDate,
  ]);

  useEffect(() => {
    if (initialValues && form) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjs(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate)
          : undefined,
      });
    }
  }, [initialValues, form]);

  return { handleGenerateStatus, maxStartDate, minStartDate, minEndDate };
};

export default useCampaignFormHelper;
