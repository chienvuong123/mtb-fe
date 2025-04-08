import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';
import { AButton } from '@components/atoms';
import type { ApproachScriptAttributeDTO, ApproachScriptDTO } from '@dtos';
import { OActionFooter, ODrawer } from '@components/organisms';
import type { TFormType } from '@types';
import { Flex, Form, Modal } from 'antd';
import { useNotification } from '@libs/antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH_SEGMENT, ROUTES } from '@routers/path';
import AttributeInsertForm from './AttributeInsertForm';
import ScenarioInsertForm from './ScenarioInsertForm';
import ScenarioTree from './ScenarioTree';
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
  const notify = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const isViewMode = location.pathname.includes('/detail/');
  const { id: scenarioId } = useParams<{ id: string }>();

  const [scenarioForm] = Form.useForm<ApproachScriptDTO>();
  const categoryCampaignId = Form.useWatch(['category'], scenarioForm);

  const [attributeList, setAttributeList] = useState<
    ApproachScriptAttributeDTO[]
  >([]);
  const [selectedAttribute, setSelectedAttribute] =
    useState<Partial<ApproachScriptAttributeDTO>>();
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [selectedParentId, setSelectedParentId] = useState<string>();

  const handleOpenAttributeForm = async () => {
    try {
      await scenarioForm.validateFields();
      setDrawerMode('add');
      setSelectedParentId(undefined);
      setSelectedAttribute(undefined);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Validation failed:', error);
    }
  };

  const handleOpenChildAttributeForm = async (parentId: string) => {
    try {
      await scenarioForm.validateFields();
      setDrawerMode('add');
      setSelectedParentId(parentId);
      setSelectedAttribute(undefined);
      console.log(
        'Đang mở form thêm node con với parentId:',
        parentId,
        selectedAttribute,
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Validation failed:', error);
    }
  };

  const handleCloseAttributeForm = () => {
    setDrawerMode(undefined);
    setSelectedAttribute(undefined);
    setSelectedParentId(undefined);
  };

  const handleSaveAttribute = (attributeData: ApproachScriptAttributeDTO) => {
    console.log('Dữ liệu trước khi lưu:', { attributeData, selectedParentId });

    setAttributeList((prevData) => {
      const currentAttributes = prevData || [];

      // Nếu đang thêm node con
      if (selectedParentId && !attributeData.id) {
        // Tạo ID mới cho node con
        const newAttribute: ApproachScriptAttributeDTO = {
          ...attributeData,
          id: `attr_${Date.now()}`,
          attributeName: attributeData.attributeName || '',
          controlType: attributeData.controlType || '',
          haveNote: attributeData.haveNote || false,
          controlCode: attributeData.controlCode || '',
          parentId: selectedParentId,
        };

        console.log('Đang thêm node con:', newAttribute);

        // Thêm node con vào cây
        return currentAttributes.concat(newAttribute);
      }

      // Nếu đang sửa
      if (attributeData.id) {
        return currentAttributes.map((attr) =>
          attr.id === attributeData.id ? attributeData : attr,
        );
      }

      // Thêm attribute mới (node gốc)
      return [
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
    });
    handleCloseAttributeForm();
  };

  const handleEditAttribute = (data: ApproachScriptAttributeDTO) => {
    setSelectedAttribute(data);
    setSelectedParentId(undefined);
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
    const deleteIds = [id];
    const findChildIds = (parentId: string) => {
      attributeList.forEach((attr) => {
        if (attr.parentId === parentId) {
          deleteIds.push(attr.id);
          findChildIds(attr.id);
        }
      });
    };

    findChildIds(id);

    setAttributeList(
      (prevData) =>
        prevData?.filter((attr) => !deleteIds.includes(attr.id)) || [],
    );
  };

  const handleUpdateAttribute = (
    id: string,
    data: Partial<ApproachScriptAttributeDTO>,
  ) => {
    setAttributeList(
      (prevData) =>
        prevData?.map((attr) =>
          attr.id === id ? { ...attr, ...data } : attr,
        ) || [],
    );
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

      // Log ra để kiểm tra dữ liệu trước khi gửi đi
      console.log('Dữ liệu trước khi lưu kịch bản:', attributeList);

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
          parentId: attr.parentId, // Thêm thông tin parentId
        })),
      };

      onSubmit(scenarioData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Validation failed:', error);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.SCENARIO.LIST);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Xác nhận hủy',
      content:
        'Bạn có chắc chắn muốn hủy? Tất cả các thay đổi sẽ không được lưu.',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      onOk: handleBack,
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

  console.log('attributeList', attributeList);

  return (
    <div className="pt-32">
      <Flex justify="space-between" align="center" className="mb-16">
        <Title level={3} className="mb-0">
          {title}
        </Title>
        {isViewMode && (
          <AButton
            color="primary"
            variant="filled"
            onClick={() =>
              navigate(
                `${ROUTES.SCENARIO.ROOT}/${PATH_SEGMENT.PREVIEW}/${scenarioId}`,
              )
            }
          >
            Xem trước
          </AButton>
        )}
      </Flex>
      <ScenarioInsertForm form={scenarioForm} />
      <div className="mt-24" />
      <Flex className="mt-24" justify="space-between" align="center">
        <Title level={4} style={{ margin: 0 }}>
          Danh sách Attribute
        </Title>
        {!isViewMode && (
          <AButton onClick={handleOpenAttributeForm} type="primary">
            Tạo mới Attribute
          </AButton>
        )}
      </Flex>
      <div className="mt-24" />
      <ScenarioTree
        dataSource={attributeList || []}
        onEdit={handleEditAttribute}
        onDelete={handleDeleteAttribute}
        onView={handleViewAttribute}
        onAddChild={handleOpenChildAttributeForm}
        onUpdate={handleUpdateAttribute}
      />
      <div className="mt-96" />
      <OActionFooter
        onBack={isViewMode ? handleBack : undefined}
        onCancel={isViewMode ? undefined : handleCancel}
        onSave={isViewMode ? undefined : handleSaveScenario}
      />
      <ODrawer
        destroyOnClose
        onClose={handleCloseAttributeForm}
        open={!!drawerMode}
        width={1643}
        usePrefixTitle
        title={selectedParentId ? 'Tạo lựa chọn' : 'Attribute'}
        mode={drawerMode}
      >
        <AttributeInsertForm
          onClose={handleCloseAttributeForm}
          initialValues={selectedAttribute}
          onSubmit={handleSaveAttribute}
          mode={drawerMode}
          categoryCampaignId={categoryCampaignId}
          parentId={selectedParentId}
        />
      </ODrawer>
    </div>
  );
};

export default ScenarioForm;
