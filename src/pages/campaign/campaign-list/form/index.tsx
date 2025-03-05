import Title from 'antd/lib/typography/Title';
import { Flex, type NotificationArgsProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AButton } from '@components/atoms';
import React, { useMemo, useState } from 'react';
import type {
  CampaignScriptDTO,
  CampaignTargetDTO,
  TCampaignDetailDTO,
} from 'src/dtos/campaign-detail';
import {
  useCampaignDetailAddMutation,
  useCampaignDetailEditMutation,
  useCampaignDetailRemoveMutation,
  useCampaignDetailViewQuery,
  useCampaignScriptQuery,
} from '@hooks/queries/campaignDetailQueries';
import { useNotification } from '@libs/antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ODrawer } from '@components/organisms';
import { MANAGER_CAMPAIGN } from '@routers/path';
import type { TFormType } from '@types';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { useManageCategoryAddMutation } from '@hooks/queries/manageCategoryQueries';
import type { TId } from '@dtos';
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
    form.resetFields();
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

  const { mutate: mutationCreateCampaign } = useCampaignDetailAddMutation();
  const { mutate: mutationUpdateCampaign } = useCampaignDetailEditMutation();
  const { mutate: mutationCreateCategory } = useManageCategoryAddMutation();
  const { mutate: mutationDeleteCampaignDetail } =
    useCampaignDetailRemoveMutation();

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
            navigate(`/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CAMPAIGN}`);
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
          navigate(`/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CAMPAIGN}`);
        });
      },
    });
  };

  const handleSubmitInsertCategory = async () => {
    const values = await form.validateFields();

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
        validationHelper(d, notify, () => {
          handleResetCategory({
            type: 'success',
            message: 'Tạo mới thành công',
          });
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
    mutationDeleteCampaignDetail({ id });
  };

  const handleBack = () => {
    navigate(`/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CAMPAIGN}`);
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
          form={form}
        />
      </ODrawer>
    </div>
  );
};

export default CampaignCreate;
