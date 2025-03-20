import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';
import { AButton } from '@components/atoms';
import type { ApproachScriptAttributeDTO, ApproachScriptDTO } from '@dtos';
import { ODrawer } from '@components/organisms';
import type { TFormType } from '@types';
import { Flex, Form, Modal } from 'antd';
import { useNotification } from '@libs/antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import AttributeInsertForm from './AttributeInsertForm';
import AttributeTable from './AttributeTable';
import ScenarioInsertForm from './ScenarioInsertForm';
import '../index.scss';

interface ScenarioFormProps {
  title: string;
  initialData?: {
    scenarioData?: Partial<ApproachScriptDTO>;
    attributeList?: ApproachScriptAttributeDTO[];
  };
  onSubmit: (data: Partial<ApproachScriptDTO>) => void;
}

const ScenarioForm: FC<ScenarioFormProps> = ({
  title,
  initialData,
  onSubmit,
}) => {
  const [attributeList, setAttributeList] = useState<
    ApproachScriptAttributeDTO[]
  >([]);
  const [selectedAttribute, setSelectedAttribute] =
    useState<Partial<ApproachScriptAttributeDTO>>();
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [scenarioForm] = Form.useForm<ApproachScriptDTO>();
  const notify = useNotification();
  const navigate = useNavigate();

  const categoryCampaignId = Form.useWatch(['category'], scenarioForm);

  const handleOpenAttributeForm = async () => {
    try {
      await scenarioForm.validateFields();
      setDrawerMode('add');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCloseAttributeForm = () => setDrawerMode(undefined);

  const handleSaveAttribute = (attributeData: ApproachScriptAttributeDTO) => {
    setAttributeList((prevData) => {
      const currentAttributes = prevData || [];
      const updatedAttributes = attributeData.id
        ? currentAttributes.map((attr) =>
            attr.id === attributeData.id ? attributeData : attr,
          )
        : [
            ...currentAttributes,
            {
              ...attributeData,
              id: attributeData.id || `attr_${Date.now()}`,
              attributeName: attributeData.attributeName || '',
              controlType: attributeData.controlType || '',
              haveNote: attributeData.haveNote || false,
              controlCode: attributeData.controlCode || '',
            },
          ];

      return updatedAttributes;
    });
    handleCloseAttributeForm();
  };

  const handleEditAttribute = (data: ApproachScriptAttributeDTO) => {
    setSelectedAttribute(data);
    setDrawerMode('edit');
  };

  const handleViewAttribute = (id: string) => {
    const attribute = attributeList?.find((attr) => attr.id === id);
    if (attribute) {
      setSelectedAttribute(attribute);
      setDrawerMode('view');
    }
  };

  const handleDeleteAttribute = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa attribute này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        setAttributeList(
          (prevData) => prevData?.filter((attr) => attr.id !== id) || [],
        );
      },
    });
  };

  const handleSaveScenario = async () => {
    try {
      await scenarioForm.validateFields();
      const scenarioFormData: ApproachScriptDTO =
        scenarioForm.getFieldsValue(true);

      if (!attributeList.length) {
        notify({
          message: 'Vui lòng thêm ít nhất một attribute',
          type: 'error',
        });
        return;
      }

      const scenarioData = {
        approachScript: {
          name: scenarioFormData.name,
          category: scenarioFormData.category,
          desc: scenarioFormData.desc,
          status: scenarioFormData.status,
        },
        approachSteps: attributeList.map((attr, idx) => ({
          controlCatalogCreateReq: {
            controlType: attr.controlCode,
            name: attr.attributeName,
            content: JSON.stringify(attr.content),
            description: attr.description,
            haveNote: attr.haveNote,
          },
          name: attr.attributeName,
          ordered: idx + 1,
        })),
      };

      onSubmit(scenarioData);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Xác nhận hủy',
      content:
        'Bạn có chắc chắn muốn hủy? Tất cả các thay đổi sẽ không được lưu.',
      okText: 'Đồng ý',
      cancelText: 'Không',
      onOk: () => navigate(ROUTES.SCENARIO.LIST),
    });
  };

  useEffect(() => {
    if (initialData?.scenarioData) {
      scenarioForm.setFieldsValue(initialData.scenarioData);
    }
    if (initialData?.attributeList?.length) {
      setAttributeList(initialData.attributeList);
    }
  }, [initialData, scenarioForm]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        {title}
      </Title>
      <ScenarioInsertForm form={scenarioForm} />
      <div className="mt-24" />
      <Flex className="mt-24" justify="space-between" align="center">
        <Title level={4} style={{ margin: 0 }}>
          Danh sách Attribute
        </Title>
        <AButton onClick={handleOpenAttributeForm} type="primary">
          Tạo mới Attribute
        </AButton>
      </Flex>
      <div className="mt-24" />
      <AttributeTable
        dataSource={attributeList || []}
        onEdit={handleEditAttribute}
        onDelete={handleDeleteAttribute}
        onView={handleViewAttribute}
      />
      <div className="mt-96" />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 265,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Flex gap={16} justify="end" className="px-40 py-24 bg-white z-1000">
          <AButton color="primary" variant="filled" onClick={handleCancel}>
            Hủy
          </AButton>
          <AButton type="primary" onClick={handleSaveScenario}>
            Lưu
          </AButton>
        </Flex>
      </div>

      <ODrawer
        destroyOnClose
        onClose={handleCloseAttributeForm}
        open={!!drawerMode}
        width={1643}
        usePrefixTitle
        title="Attribute"
        mode={drawerMode}
      >
        <AttributeInsertForm
          onClose={handleCloseAttributeForm}
          initialValues={selectedAttribute}
          onSubmit={handleSaveAttribute}
          mode={drawerMode}
          categoryCampaignId={categoryCampaignId}
        />
      </ODrawer>
    </div>
  );
};

export default ScenarioForm;
