import { OBaseForm } from '@components/organisms';
import { QUILL_TOOLBARS } from '@constants/editor';
import { EControlType } from '@constants/masterData';
import type { ApproachScriptAttributeDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem, type TFormType } from '@types';
import { useForm, useWatch } from 'antd/lib/form/Form';
import { useEffect, useMemo, type FC } from 'react';

import './AttributeInsertForm.scss';
import { useControlSearchQuery } from '@hooks/queries';
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  theme,
  Typography,
} from 'antd';
import { ArrowDown01RoundIcon, PlusIcon, TrashIcon } from '@assets/icons';
import AttributeItem from '@components/organisms/o-scenario-script-container/components/AttributeItem';
import { ACollapse } from '@components/atoms';
import { URL_REGEX } from '@constants/regex';

const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => {
  return (
    <ArrowDown01RoundIcon
      style={{
        rotate: isActive ? '180deg' : '0deg',
        transition: 'rotate 0.2s',
      }}
    />
  );
};

interface IAttributeInsertForm {
  mode?: TFormType;
  initialValues?: Partial<ApproachScriptAttributeDTO> | null;
  onClose: () => void;
  onSubmit: (values: ApproachScriptAttributeDTO) => void;
}

const AttributeInsertForm: FC<IAttributeInsertForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();
  const controlCode = useWatch('controlCode', form);
  const attributeName = useWatch('attributeName', form);
  const description = useWatch('description', form);
  const haveNote = useWatch(['haveNote'], form);
  const content = useWatch(['content'], form);

  const { data: controlTypeOptionsData } = useControlSearchQuery({
    page: {
      pageNum: 1,
      pageSize: 1000,
    },
  });

  const controlTypeOptions = useMemo(() => {
    return (
      controlTypeOptionsData?.data.content.map((item) => ({
        label: item.name,
        value: item.id,
      })) ?? []
    );
  }, [controlTypeOptionsData]);

  const controlType = useMemo(() => {
    return controlTypeOptionsData?.data.content.find(
      (item) => item.id === controlCode,
    )?.type;
  }, [controlTypeOptionsData, controlCode]);

  const previewData = useMemo(() => {
    const contentString = content ? JSON?.stringify(content) : '';

    return {
      id: initialValues?.id || 'preview',
      attributeName: attributeName || 'Attribute Preview',
      description: description || '',
      controlType: controlType || '',
      controlCode: controlCode || '',
      haveNote: haveNote || false,
      content: contentString,
    } as ApproachScriptAttributeDTO;
  }, [
    attributeName,
    controlCode,
    controlType,
    description,
    haveNote,
    content,
    initialValues?.id,
  ]);

  const renderDynamicOptions = (
    name: string | number | (string | number)[],
  ) => (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div className="dynamic-options-container">
          {fields.map((field, index) => (
            <Form.Item
              label={`Giá trị ${index + 1}`}
              required
              key={field.key}
              className="dynamic-option-item mb-0"
            >
              <Flex gap={8}>
                <Form.Item
                  {...field}
                  name={field.name}
                  className="dynamic-option-form-item"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập..." maxLength={100} />
                </Form.Item>
                <TrashIcon
                  onClick={() => remove(field.name)}
                  className="dynamic-option-delete-icon cursor-pointer"
                />
              </Flex>
            </Form.Item>
          ))}
          <Form.Item className="dynamic-option-add-button">
            <Button
              type="dashed"
              onClick={() => add()}
              block
              className="dis-flex"
            >
              <PlusIcon className="svg-fill-black" />
              Thêm lựa chọn
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );

  const items = useMemo(() => {
    const baseItems = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên',
        name: 'attributeName',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
        rules: [{ required: true }],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Control',
        name: 'controlCode',
        inputProps: {
          options: controlTypeOptions,
        },
        rules: [{ required: true }],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.CHECKBOX,
        name: 'haveNote',
        label: 'Ghi chú',
        inputProps: { children: 'Hiển thị ghi chú' },
        colProps: { span: 24 },
        valuePropName: 'checked',
      },
      {
        type: INPUT_TYPE.EDITOR,
        label: 'Nội dung',
        name: 'description',
        inputProps: {
          placeholder: 'Nhập...',
          modules: {
            toolbar: QUILL_TOOLBARS,
            clipboard: { matchVisual: false },
          },
          className: 'mbb-content-editor',
          bounds: '#attribute-insert-form',
        },
        colProps: { span: 24 },
      },
    ] as TFormItem[];

    switch (controlType) {
      case EControlType.DATETIME:
      case EControlType.NUMBER:
      case EControlType.SWITCH:
        return baseItems;
      case EControlType.BUTTON:
        return [
          ...baseItems,
          {
            type: INPUT_TYPE.TEXT,
            label: 'Tên Button',
            name: ['content', 'title'],
            inputProps: { placeholder: 'Nhập...', maxLength: 100 },
            rules: [{ required: true }],
            colProps: { span: 12 },
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Link submit',
            name: ['content', 'link'],
            inputProps: { placeholder: 'Nhập...', maxLength: 100 },
            rules: [
              { required: true },
              {
                pattern: URL_REGEX,
                message: 'Link không hợp lệ',
              },
            ],
            colProps: { span: 12 },
          },
        ];
      case EControlType.IMAGE:
        return [
          ...baseItems,
          {
            type: INPUT_TYPE.SELECT,
            label: 'Hình ảnh',
            name: ['content', 'src'],
            inputProps: {
              placeholder: 'Chọn...',
              options: [
                {
                  label: 'Ảnh 1',
                  value: 'https://picsum.photos/id/1/200/300',
                },
                {
                  label: 'Ảnh 2',
                  value: 'https://picsum.photos/id/2/200/300',
                },
                {
                  label: 'Ảnh 3',
                  value: 'https://picsum.photos/id/3/200/300',
                },
              ],
            },
            rules: [{ required: true }],
            colProps: { span: 12 },
          },
        ];
      case EControlType.CHECKBOX:
      case EControlType.RADIO:
      case EControlType.SELECT:
        return [
          ...baseItems,
          {
            type: INPUT_TYPE.BLANK,
            label: 'Danh sách lựa chọn',
            name: ['content', 'options'],
            colProps: { span: 24 },
            children: renderDynamicOptions(['content', 'options']),
          },
        ];
      case EControlType.EDITOR:
      default:
        return baseItems;
    }
  }, [controlType, controlTypeOptions]);

  const handleSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue(true);

    onSubmit({
      ...values,
      controlName:
        controlTypeOptions.find((item) => item.value === values.controlCode)
          ?.label || '',
    });
  };

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (
      controlType === EControlType.SELECT ||
      controlType === EControlType.CHECKBOX ||
      controlType === EControlType.RADIO
    ) {
      const currentOptions = form.getFieldValue(['content', 'options']);
      if (!currentOptions || currentOptions.length === 0) {
        form.setFieldValue(['content', 'options'], ['', '']);
      }
    }
  }, [controlType, form]);
  const { token } = theme.useToken();

  const attributeItems = [
    {
      key: 'preview',
      label: attributeName || 'Attribute Preview',
      children: <AttributeItem data={previewData} approachId="preview" />,
      style: {
        marginBottom: 16,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        border: 'none',
      },
    },
  ];

  return (
    <div id="attribute-insert-form">
      <Row>
        <Col span={14}>
          <Card
            title={<Typography.Title level={5}>Bản xem trước</Typography.Title>}
            className="preview-card"
            style={{ height: '100%', overflowY: 'auto' }}
          >
            <ACollapse
              bordered={false}
              expandIconPosition="end"
              expandIcon={ExpandIcon}
              style={{ background: token.colorBgContainer }}
              items={attributeItems}
              defaultActiveKey={['preview']}
            />
          </Card>
        </Col>
        <Col span={10}>
          <OBaseForm<ApproachScriptAttributeDTO>
            mutationKey="AttributeInsert"
            items={items as TFormItem[]}
            form={form}
            onSubmit={handleSubmit}
            onClose={onClose}
            isViewMode={mode === 'view'}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AttributeInsertForm;
