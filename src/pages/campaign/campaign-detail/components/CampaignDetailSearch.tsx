import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import type {
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TCampaignDetailSearchForm,
} from 'src/dtos/campaign-detail';
import type { TMediaRecord } from '@pages/category/media-category/components/MediaTable';
import type { ITable } from '@components/organisms';
import { dayjsToString } from '@utils/dateHelper';
import CampaignTargetDetailTable from './CampaignTargetDetailTable';
import '../index.scss';

interface ICampaignDetailSearch {
  initialValues?: Partial<TCampaignDetailDTO>;
  dataSource?: CampaignTargetDTO[];
  onEdit: ITable<TMediaRecord>['onEdit'];
  onDelete: (id: string) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Category',
    name: 'categoryName',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Campaign',
    name: 'codeCampaign',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Campaign',
    name: 'nameCampaign',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày bắt đầu',
    name: 'startDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
      disabled: true,
    },
  },
  {
    type: INPUT_TYPE.DATE_PICKER,
    label: 'Ngày kết thúc',
    name: 'endDate',
    inputProps: {
      placeholder: 'Chọn ngày...',
      className: 'date-picker-campaign',
      disabled: true,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Chi nhánh triển khai',
    name: 'branches',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Loại chiến dịch',
    name: 'status',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Phương thức triển khai',
    name: 'implementationMethod',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Phụ trách triển khai',
    name: 'supervisor',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Danh mục khách hàng',
    name: 'customerCatalog',
    inputProps: { placeholder: 'Chọn...', disabled: true },
  },
  { type: INPUT_TYPE.BLANK },
  { type: INPUT_TYPE.BLANK },
  {
    type: INPUT_TYPE.TEXT_AREA,
    label: 'Ghi chú',
    name: 'note',
    colProps: {
      span: 12,
    },
    inputProps: {
      placeholder: 'Nhập...',
      maxLength: 1000,
      disabled: true,
      showCount: {
        formatter: ({ count, maxLength }) => (
          <span className="pos-absolute right-8 bottom-22 text-gray fs-12">
            ({count}/{maxLength})
          </span>
        ),
      },
      className: 'w-full no-resize',
    },
  },
  {
    type: INPUT_TYPE.TEXT_AREA,
    label: 'Phạm vi triển khai',
    name: 'scopeImplementation',
    colProps: {
      span: 12,
    },
    inputProps: {
      placeholder: 'Nhập...',
      maxLength: 1000,
      disabled: true,
      showCount: {
        formatter: ({ count, maxLength }) => (
          <span className=".custom-text-erea-campaign">
            ({count}/{maxLength})
          </span>
        ),
      },
      className: 'w-full no-resize',
    },
  },
];

const CampaignDetailSearch: React.FC<ICampaignDetailSearch> = ({
  initialValues,
  dataSource,
  onEdit,
  onDelete,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjsToString(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjsToString(initialValues.endDate)
          : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<TCampaignDetailSearchForm>
        items={items}
        form={form}
        isViewMode
      />
      <hr className="border-t border-[#EAEAEA] mx-40" />
      <CampaignTargetDetailTable
        dataSource={dataSource || []}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default CampaignDetailSearch;
