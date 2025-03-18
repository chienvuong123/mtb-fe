import Title from 'antd/lib/typography/Title';
import { Flex, type NotificationArgsProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AButton } from '@components/atoms';
import React, { useMemo, useState } from 'react';
import { useNotification } from '@libs/antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ODrawer } from '@components/organisms';
import { ROUTES } from '@routers/path';
import type { TFormType } from '@types';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import {
  useCampaignAddMutation,
  useCampaignDetailViewQuery,
  useCampaignEditMutation,
  useCampaignRemoveMutation,
  useCampaignScriptQuery,
  useQueryCategoryList,
} from '@hooks/queries';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { useManageCategoryAddMutation } from '@hooks/queries/manageCategoryQueries';
import type {
  CampaignScriptDTO,
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TId,
} from '@dtos';
import { validationHelper } from '@utils/validationHelper';
import CategoryInsertForm from '@pages/campaign/category-list/components/CategoryInsert';
import CampaignTargetForm from './components/CampaignTargerForm';
import CampaignApproachForm from './components/CampaignApproachForm';
import {
  CampaignDetailSearch,
  CampaignDetailTable,
  type TCampaignDetaillRecord,
} from '../details/components';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Quay lại',
} as const;

const CampaignCreate: React.FC = () => {
  const [showInsertTargetForm, setShowInsertTargetForm] = useState<TFormType>();
  const [showInsertApproachForm, setShowInsertApproachForm] =
    useState<TFormType>();
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initTargetValues, setInitTargetValues] =
    useState<Partial<TCampaignDetaillRecord> | null>(null);
  const [initApproachValues, setInitApproachValues] =
    useState<TCampaignDetaillRecord | null>(null);

  const notify = useNotification();

  const [isViewMode, setIsViewMode] = useState(false);
  const [isViewModeTarget, setIsViewModeTarget] = useState(false);

  const [tempTargets, setTempTargets] = useState<CampaignTargetDTO | null>(
    null,
  );

  const [tempApproach, setTempApproach] = useState<CampaignScriptDTO | null>(
    null,
  );

  const { id: campaignId } = useParams<TId>();

  const [form] = useForm();
  const [formCategory] = useForm();

  const navigate = useNavigate();

  const { data: campaignDetailRes } = useCampaignDetailViewQuery({
    id: campaignId ?? '',
  });

  const { data: campaignScriptQuery } = useCampaignScriptQuery({
    id: campaignId ?? '',
  });

  const handleShowForm = () => {
    setDrawerMode('add');
  };

  const handleResetCategory = ({ message, type }: NotificationArgsProps) => {
    formCategory.resetFields();
    notify({ message, type });
  };

  const handleShowTargetForm = () => {
    setShowInsertTargetForm('add');
  };

  const handleShowApproachForm = () => {
    setShowInsertApproachForm('add');
  };

  const handleCloseForm = () => {
    setShowInsertTargetForm(undefined);
    setIsViewMode(false);
    setIsViewModeTarget(false);
    setShowInsertApproachForm(undefined);
    setDrawerMode(undefined);
  };

  const handleReset = ({ message, type }: NotificationArgsProps) => {
    handleCloseForm();
    setInitTargetValues(null);
    setInitApproachValues(null);
    notify({ message, type });
  };

  const { mutate: mutationCreateCampaign } = useCampaignAddMutation();
  const { mutate: mutationUpdateCampaign } = useCampaignEditMutation();
  const { mutate: mutationCreateCategory } = useManageCategoryAddMutation();
  const { mutate: mutationDeleteCampaign } = useCampaignRemoveMutation();
  const { refetch: refetchCategory } = useQueryCategoryList(true);

  const dataSourcesDetail: Partial<TCampaignDetailDTO> = useMemo(
    () => campaignDetailRes?.data ?? {},
    [campaignDetailRes],
  );

  const dataSourcesTarget: Partial<TCampaignDetailDTO> = useMemo(() => {
    const safeTargets = Array.isArray(campaignDetailRes?.data?.targets)
      ? [...campaignDetailRes.data.targets]
      : [];

    if (tempTargets) {
      safeTargets.push(tempTargets);
    }

    return {
      ...campaignDetailRes?.data,
      targets: safeTargets,
    };
  }, [campaignDetailRes, tempTargets]);

  const dataSources: TCampaignDetaillRecord[] = useMemo(() => {
    const safeData = Array.isArray(campaignScriptQuery?.data?.content)
      ? campaignScriptQuery.data.content
      : [];

    if (tempApproach) {
      safeData.push({
        ...tempApproach,
      });
    }

    return safeData;
  }, [campaignScriptQuery, tempApproach]);

  const handleSubmitInsert = () => {
    const valueSearchForm = form.getFieldsValue();
    const data = {
      ...valueSearchForm,
      target: tempTargets,
      approach: tempApproach,
    };

    // update campaign
    if (campaignId) {
      mutationUpdateCampaign(data, {
        onSuccess: (d) => {
          validationHelper(d, notify, () => {
            handleReset({
              type: 'success',
              message: 'Thay đổi thành công',
            });
            navigate(ROUTES.CAMPAIGN.LIST);
          });
        },
      });
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

  const handleSaveTarget = (value: CampaignTargetDTO) => {
    setTempTargets(value);
    setShowInsertTargetForm(undefined);
  };

  const handleSaveApproach = (value: CampaignScriptDTO) => {
    setTempApproach(value);
    setShowInsertApproachForm(undefined);
  };

  const handleEdit = (data: TCampaignDetaillRecord) => {
    setInitTargetValues({
      ...data,
    });
    setShowInsertTargetForm('edit');
  };

  const handleApproachEdit = (data: TCampaignDetaillRecord) => {
    setInitApproachValues({
      ...data,
    });
    setShowInsertApproachForm('edit');
  };

  const handleDelete = (id: string) => {
    mutationDeleteCampaign({ id });
  };

  const handleBack = () => {
    navigate(ROUTES.CAMPAIGN.LIST);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        {campaignId ? 'Chỉnh sửa Campaign' : 'Tạo mới Campaign'}
      </Title>
      <CampaignDetailSearch
        initialValues={dataSourcesDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
        dataSource={dataSourcesTarget.targets}
        onShowForm={handleShowForm}
        onShowTargetForm={handleShowTargetForm}
        isDisabled={false}
        form={form}
      />
      <div className="mb-24" />
      <CampaignDetailTable
        onEdit={handleApproachEdit}
        dataSource={dataSources}
        onShowApproachForm={handleShowApproachForm}
      />
      <div
        className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 px-4"
        hidden={isViewMode}
      >
        <Flex justify="between" className="py-4 w-full px-6" gap="middle">
          <Flex className="ml-auto" gap="middle">
            <AButton onClick={handleBack} variant="outlined">
              {BUTTON_TEXT.CANCEL}
            </AButton>
            <AButton
              onClick={handleSubmitInsert}
              type="primary"
              variant="filled"
            >
              {BUTTON_TEXT.SAVE}
            </AButton>
          </Flex>
        </Flex>
      </div>
      <ODrawer
        usePrefixTitle
        title="mục tiêu"
        mode={showInsertTargetForm}
        onClose={handleCloseForm}
        open={!!showInsertTargetForm}
        width={1080}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <CampaignTargetForm
          mode={isViewMode ? 'view' : 'add'}
          onClose={handleCloseForm}
          initialValues={initTargetValues as CampaignTargetDTO}
          onSubmit={handleSaveTarget}
        />
      </ODrawer>
      <ODrawer
        usePrefixTitle
        title="kế hoạch tiếp cận"
        mode={showInsertApproachForm}
        onClose={handleCloseForm}
        open={!!showInsertApproachForm}
        width={1080}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <CampaignApproachForm
          mode={isViewModeTarget ? 'view' : 'add'}
          onClose={handleCloseForm}
          initialValues={initApproachValues as CampaignScriptDTO}
          onSubmit={handleSaveApproach}
        />
      </ODrawer>
      <ODrawer
        usePrefixTitle
        title="category"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        <CategoryInsertForm
          key={drawerMode ?? 'view'}
          mode={drawerMode === 'view' ? 'view' : 'add'}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsertCategory}
          isDisabled={false}
          form={formCategory}
        />
      </ODrawer>
    </div>
  );
};

export default CampaignCreate;
