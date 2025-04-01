import Title from 'antd/lib/typography/Title';
import { Flex, type NotificationArgsProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AButton } from '@components/atoms';
import React, { useEffect, useMemo, useState } from 'react';
import { useNotification } from '@libs/antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ODrawer } from '@components/organisms';
import { createNavigatePath, ROUTES } from '@routers/path';
import type { TFormType } from '@types';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import {
  useCampaignAddMutation,
  useCampaignDetailViewQuery,
  useCampaignEditMutation,
  useQueryCategoryList,
  useManageCategoryAddMutation,
} from '@hooks/queries';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import type {
  CampaignApproachPlanDTO,
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TId,
} from '@dtos';
import { validationHelper } from '@utils/validationHelper';
import CategoryInsertForm from '@pages/campaign/category-list/components/CategoryInsert';
import CampaignTargetForm from './components/CampaignTargerForm';
import CampaignApproachForm from './components/CampaignApproachForm';
import CampaignInsertForm from './components/CampaignInsertForm';
import { CampaignTargetDetailTable } from '../details/components';
import CampaignApproachDetailTable from '../details/components/CampaignApproachDetailTable';
import { handleSaveItem, handleUpdateId } from '../utils/util';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Quay lại',
  COPY: 'Tạo bản sao',
} as const;

const CampaignCreate: React.FC = () => {
  const [showInsertTargetForm, setShowInsertTargetForm] = useState<TFormType>();
  const [showInsertApproachForm, setShowInsertApproachForm] =
    useState<TFormType>();
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initTargetValues, setInitTargetValues] = useState<CampaignTargetDTO[]>(
    [],
  );
  const [initApproachValues, setInitApproachValues] = useState<
    CampaignApproachPlanDTO[]
  >([]);

  const notify = useNotification();

  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditModeTarget, setIsEditModeTarget] = useState(false);
  const [isEditModeApproach, setIsEditModeApproach] = useState(false);

  const [tempTargets, setTempTargets] = useState<CampaignTargetDTO | null>(
    null,
  );
  const [tempApproach, setTempApproach] =
    useState<CampaignApproachPlanDTO | null>(null);

  const { id: campaignId } = useParams<TId>();

  const [form] = useForm();
  const [formCategory] = useForm();
  const [formTarget] = useForm();
  const [formApproach] = useForm();

  const navigate = useNavigate();

  const { data: campaignDetailRes } = useCampaignDetailViewQuery({
    id: campaignId ?? '',
  });

  useEffect(() => {
    if (campaignDetailRes?.data) {
      setInitTargetValues(campaignDetailRes.data.targets ?? []);
      setInitApproachValues(campaignDetailRes.data.campaignScript ?? []);
      if (campaignId) {
        form.setFieldsValue({
          ...campaignDetailRes.data,
          startDate: campaignDetailRes.data.startDate
            ? dayjs(campaignDetailRes.data.startDate)
            : undefined,
          endDate: campaignDetailRes.data.endDate
            ? dayjs(campaignDetailRes.data.endDate)
            : undefined,
        });
      }
    }
  }, [campaignDetailRes, campaignId, form]);

  const handleShowForm = () => {
    setDrawerMode('add');
  };

  const handleResetCategory = ({ message, type }: NotificationArgsProps) => {
    formCategory.resetFields();
    notify({ message, type });
  };

  const handleShowTargetForm = () => {
    setShowInsertTargetForm('add');
    setIsEditModeTarget(false);
    formTarget.resetFields();
  };

  const handleShowApproachForm = () => {
    setShowInsertApproachForm('add');
    setIsEditModeApproach(false);
    formApproach.resetFields();
  };

  const handleCloseForm = () => {
    setIsViewMode(false);
    setIsEditModeTarget(false);
    setIsEditModeApproach(false);
    setDrawerMode(undefined);
    setShowInsertTargetForm(undefined);
    setShowInsertApproachForm(undefined);
    setTempTargets(null);
    setTempApproach(null);
    formTarget.resetFields();
    formApproach.resetFields();
  };

  const handleReset = ({ message, type }: NotificationArgsProps) => {
    handleCloseForm();
    setTempTargets(null);
    setTempApproach(null);
    notify({ message, type });
  };
  const { mutate: mutationCreateCampaign, isPending: isCreateLoading } =
    useCampaignAddMutation();
  const { mutate: mutationUpdateCampaign, isPending: isUpdateLoading } =
    useCampaignEditMutation();
  const { mutate: mutationCreateCategory } = useManageCategoryAddMutation();
  const { refetch: refetchCategory } = useQueryCategoryList(true);
  const dataSourcesDetail: Partial<TCampaignDetailDTO> = useMemo(
    () => ({
      ...campaignDetailRes?.data,
    }),
    [campaignDetailRes],
  );

  const handleSubmitInsert = async () => {
    const valueSearchForm = await form.validateFields();

    const data = {
      ...valueSearchForm,
      name: valueSearchForm?.name?.trim(),
      targets: handleUpdateId(initTargetValues),
      campaignScripts: handleUpdateId(initApproachValues),
    };

    if (!data.targets || data.targets.length === 0) {
      notify({
        type: 'error',
        message: 'Bắt buộc nhập mục tiêu',
      });
      return;
    }

    if (!data.campaignScripts || data.campaignScripts.length === 0) {
      notify({
        type: 'error',
        message: 'Bắt buộc nhập kế hoạch tiếp cận',
      });
      return;
    }

    // update campaign
    if (campaignId) {
      mutationUpdateCampaign(
        { ...data, id: campaignId },
        {
          onSuccess: (d) => {
            validationHelper(d, notify, () => {
              handleReset({
                type: 'success',
                message: 'Thay đổi thành công',
              });
              navigate(ROUTES.CAMPAIGN.LIST);
            });
          },
        },
      );
      return;
    }
    // create new campaign
    mutationCreateCampaign(data, {
      onSuccess: (d) => {
        validationHelper(d, notify, () => {
          handleReset({
            type: 'success',
            message: 'Thêm mới thành công',
          });
          navigate(ROUTES.CAMPAIGN.LIST);
        });
      },
    });
  };

  const handleSubmitInsertCategory = async () => {
    const values = await formCategory.validateFields();

    const data: Partial<ManagerCategoryDTO> = {
      name: values.name,
      customer: values.customer,
      deploymentMethod: values.deploymentMethod,
      mainProduct: values.mainProduct,
      subProduct: values.subProduct,
      note: values.note,
      scope: values.scope,
      status: values.status,
      startDate: dayjs(values.startDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
      endDate: dayjs(values.endDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
    };

    // create new category
    mutationCreateCategory(data, {
      onSuccess: (d) => {
        validationHelper(d, notify, async () => {
          handleResetCategory({
            type: 'success',
            message: 'Tạo mới thành công',
          });
          await refetchCategory();
          const responseData = d.data as unknown as { id: string };
          form.setFieldsValue({ categoryName: responseData.id });
          handleCloseForm();
        });
      },
    });
  };

  const handleCreateCopy = async () => {
    const newUrl = createNavigatePath(ROUTES.CAMPAIGN.COPY, {
      id: campaignId || '',
    });
    // Mở tab mới
    window.open(newUrl, '_blank');
  };
  const handleSaveTarget = (value: CampaignTargetDTO) => {
    handleSaveItem(value, setInitTargetValues, tempTargets, handleCloseForm);
  };
  const handleSaveApproach = (value: CampaignApproachPlanDTO) => {
    handleSaveItem(value, setInitApproachValues, tempApproach, handleCloseForm);
  };
  const handleTargetEdit = (data: CampaignTargetDTO) => {
    setTempTargets({ ...data });
    setShowInsertTargetForm('edit');
    setIsEditModeTarget(true);
    formTarget.setFieldsValue(data);
  };
  const handleApproachEdit = (data: CampaignApproachPlanDTO) => {
    setTempApproach({
      ...data,
    });
    setShowInsertApproachForm('edit');
    setIsEditModeApproach(true);
    formApproach.setFieldsValue(data);
  };
  const handleDeleteTarget = (id: string) => {
    setInitTargetValues((prevTargets) => {
      const newTargets = prevTargets.filter((target) => target.id !== id);
      return newTargets;
    });
  };
  const handleDeleteApproach = (id: string) => {
    setInitApproachValues((prevApproach) => {
      const newApproach = prevApproach.filter((approach) => approach.id !== id);
      return newApproach;
    });
  };
  const handleBack = () => {
    navigate(ROUTES.CAMPAIGN.LIST);
  };
  const getDrawerProps = () => {
    let config = {
      title: 'category',
      mode: drawerMode,
      width: 1025,
      content: (
        <CategoryInsertForm
          key={drawerMode ?? 'view'}
          mode={drawerMode === 'view' ? 'view' : 'add'}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsertCategory}
          isDisabled={false}
          form={formCategory}
        />
      ),
    };
    if (showInsertTargetForm) {
      config = {
        title: 'mục tiêu',
        mode: isEditModeTarget ? 'edit' : 'add',
        width: 1080,
        content: (
          <CampaignTargetForm
            mode={isEditModeTarget ? 'edit' : 'add'}
            onClose={handleCloseForm}
            initialValues={tempTargets}
            onSubmit={handleSaveTarget}
            form={formTarget}
          />
        ),
      };
    } else if (showInsertApproachForm) {
      config = {
        title: 'kế hoạch tiếp cận',
        mode: isEditModeApproach ? 'edit' : 'add',
        width: 1080,
        content: (
          <CampaignApproachForm
            mode={isEditModeApproach ? 'edit' : 'add'}
            onClose={handleCloseForm}
            initialValues={tempApproach}
            onSubmit={handleSaveApproach}
            form={formApproach}
            formInsert={form}
          />
        ),
      };
    }
    return config;
  };

  const drawerProps = getDrawerProps();

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        {campaignId ? 'Chỉnh sửa Campaign' : 'Tạo mới Campaign'}
      </Title>
      <Flex
        vertical
        className="no-resize border-2 rounded-8 border-gray-border bg-white"
      >
        <CampaignInsertForm
          mode={campaignId ? 'edit' : 'add'}
          initialValues={dataSourcesDetail}
          isDisabled={false}
          form={form}
          onShowForm={handleShowForm}
        />
        <div className="px-24" />
        <CampaignTargetDetailTable
          dataSource={initTargetValues}
          onEdit={handleTargetEdit}
          onDelete={handleDeleteTarget}
          onShowTargetForm={handleShowTargetForm}
        />
      </Flex>
      <div className="mb-24" />
      <CampaignApproachDetailTable
        onEdit={handleApproachEdit}
        dataSource={initApproachValues}
        onShowApproachForm={handleShowApproachForm}
        onDelete={handleDeleteApproach}
        form={form}
      />
      <div
        className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 pr-24"
        hidden={isViewMode}
      >
        <Flex justify="between" className="py-4 w-full" gap="middle">
          <Flex className="ml-auto" gap="middle">
            {campaignId && (
              <AButton
                onClick={handleCreateCopy}
                color="green"
                variant="filled"
              >
                {BUTTON_TEXT.COPY}
              </AButton>
            )}
            <AButton onClick={handleBack} variant="outlined">
              {BUTTON_TEXT.CANCEL}
            </AButton>
            <AButton
              onClick={handleSubmitInsert}
              type="primary"
              variant="filled"
              disabled={isCreateLoading || isUpdateLoading}
            >
              {BUTTON_TEXT.SAVE}
            </AButton>
          </Flex>
        </Flex>
      </div>
      <ODrawer
        usePrefixTitle
        title={drawerProps.title}
        mode={drawerProps.mode}
        onClose={handleCloseForm}
        open={!!(showInsertTargetForm || showInsertApproachForm || drawerMode)}
        width={drawerProps.width}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        {drawerProps.content}
      </ODrawer>
    </div>
  );
};

export default CampaignCreate;
