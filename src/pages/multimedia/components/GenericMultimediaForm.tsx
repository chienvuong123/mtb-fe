import { OBaseForm } from '@components/organisms';
import {
  ACCEPTING_NUMBER_SPACE_COMMA_PATTERN,
  BLOCKING_CHARACTERS_PARTERN,
} from '@constants/regex';
import { EMediaType, type MultimediaDTO } from '@dtos';
import { MULTIMEDIA_CATEGORY_KEY, useQueryCategoryList } from '@hooks/queries';
import { useIsFetching } from '@tanstack/react-query';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import type { UploadFile } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useMemo, useState, type FC } from 'react';

const MultimediaInsertForm: FC<
  CBaseForm<MultimediaDTO> & {
    previewSrc?: { url?: string; extension: string };
    mediaType: EMediaType;
    title?: string;
  }
> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
  previewSrc,
  mediaType,
  title,
}) => {
  const [form] = useForm<MultimediaDTO>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: categoryList } = useQueryCategoryList(true);

  const handleChange = ({ fileList: files }: { fileList: UploadFile[] }) => {
    setFileList(files);
  };

  const isFetching = useIsFetching({
    queryKey: [MULTIMEDIA_CATEGORY_KEY, 'resource'],
  });

  const items: TFormItem[] = useMemo(() => {
    return [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'categoryCampaignId',
        required: true,
        rules: [{ required: true }],
        inputProps: {
          placeholder: 'Chọn...',
          options: categoryList,
          showSearch: true,
          filterOption: true,
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã',
        name: 'code',
        rules: [{ required: true }],
        inputProps: {
          disabled: mode !== 'add',
          placeholder: 'Nhập...',
          maxLength: 20,
        },
        colProps: { span: 12 },
        blockingPattern: BLOCKING_CHARACTERS_PARTERN,
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên',
        name: 'name',
        rules: [
          { required: true },
          {
            pattern: ACCEPTING_NUMBER_SPACE_COMMA_PATTERN,
            message: 'Định dạng không hợp lệ',
          },
        ],
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mô tả',
        name: 'description',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 500,
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Ngày tạo',
        name: 'createdDate',
        inputProps: { disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Người tạo',
        name: 'createdBy',
        inputProps: { disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Ngày cập nhật',
        name: 'updatedDate',
        inputProps: { disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Người cập nhật',
        name: 'updatedBy',
        inputProps: { disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.MULTIMEDIA_UPLOAD,
        name: 'file',
        label: title ? title.charAt(0).toUpperCase() + title.slice(1) : '',
        colProps: { span: 24 },
        rules: [{ required: true }],
        colon: false,
        inputProps: {
          loading: isFetching > 0,
          mediaType,
          disabled: mode === 'view',
          disabledDownload:
            mode !== 'view' || mediaType === EMediaType.DOCUMENT,
          onChange: handleChange,
        },
      },
    ] as TFormItem[];
  }, [mode, categoryList, mediaType, isFetching, title]);

  useEffect(() => {
    if (initialValues) {
      form.resetFields(); // clear cache
      const { name, ...others } = initialValues;
      form.setFieldsValue({
        ...others,
        name,
        file: previewSrc?.url,
        filename: `${name || ''}${previewSrc?.extension || ''}`,
      });
    }
  }, [initialValues, form, previewSrc]);

  return (
    <div>
      <OBaseForm<MultimediaDTO>
        mutationKey={MULTIMEDIA_CATEGORY_KEY}
        items={items}
        form={form}
        onSubmit={(values) =>
          onSubmit({ ...values, fileUpload: fileList?.[0] }, form)
        }
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
        isViewMode={mode === 'view'}
      />
    </div>
  );
};

export default MultimediaInsertForm;
