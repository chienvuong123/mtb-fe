import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AButton } from '@components/atoms';
import React, { useMemo, useState } from 'react';
import type {
  CampaignScriptDTO,
  CampaignTargetDTO,
  TCampaignDetailDTO,
} from 'src/dtos/campaign-detail';
import useUrlParams from '@hooks/useUrlParams';
import type { SortOrder } from 'antd/es/table/interface';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  useCampaignDetailAddMutation,
  useCampaignDetailEditMutation,
  useCampaignDetailRemoveMutation,
  useCampaignDetailViewQuery,
  useCampaignScriptQuery,
} from '@hooks/queries/campaignDetailQueries';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ODrawer, type TDrawerMsg } from '@components/organisms';
import { MANAGER_CATEGORY } from '@routers/path';
import type { TFormType } from '@types';
import { filterObject } from '@utils/objectHelper';
import type { BaseResponse, TId } from '@dtos';
import { validateInsertCategory } from '@pages/category/utils';
import CampaignDetailTable, {
  type TCampaignDetaillRecord,
} from './components/CampaignDetailTable';
import CampaignDetailSearch from './components/CampaignDetailSearch';
import CampaignTargetForm from './components/CampaignTargerForm';
import CampaignApproachForm from './components/CampaignApproachForm';
import './index.scss';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Trở về',
} as const;

const ManagerCampaignDetail: React.FC = () => {
  const [showInsertTargetForm, setShowInsertTargetForm] = useState<TFormType>();
  const [showInsertApproachForm, setShowInsertApproachForm] =
    useState<TFormType>();
  const [initTargetValues, setInitTargetValues] =
    useState<Partial<TCampaignDetaillRecord> | null>(null);
  const [initApproachValues, setInitApproachValues] =
    useState<Partial<TCampaignDetaillRecord> | null>(null);

  const [isViewMode, setIsViewMode] = useState(false);
  const [isViewModeTarget, setIsViewModeTarget] = useState(false);

  const [alertMessage, setAlertMessage] = useState<TDrawerMsg>({});

  const [tempTargets, setTempTargets] = useState<CampaignTargetDTO | null>(
    null,
  );

  const [tempApproach, setTempApproach] = useState<CampaignScriptDTO | null>(
    null,
  );

  const { id: campaignId } = useParams<TId>();

  const [form] = useForm();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const isView = searchParams.get('isView');

  const isAction = campaignId && isView;

  const {
    pagination: { current, pageSize },
    setPagination,
    setSort,
    filters,
    sort,
  } = useUrlParams<Partial<TCampaignDetailDTO>>();

  const { data: campaignDetailRes } = useCampaignDetailViewQuery({
    id: campaignId ?? '',
  });

  const { data: campaignScriptQuery } = useCampaignScriptQuery({
    campaignId: campaignId ?? '',
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const handleShowForm = () => {
    navigate(`/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CREATE_CATEGORY}`);
    setShowInsertTargetForm('add');
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
  };

  const handleReset = () => {
    handleCloseForm();
    setInitTargetValues(null);
    setInitApproachValues(null);
  };

  const { mutate: mutationCreateCampaign } = useCampaignDetailAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateCampaign } = useCampaignDetailEditMutation(
    {},
    handleReset,
  );
  const { mutate: mutationDeleteCampaignDetail } =
    useCampaignDetailRemoveMutation();

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

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

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: campaignScriptQuery?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleInvalidate = (
    data?: BaseResponse<boolean>,
    isEdit: boolean = false,
  ) => {
    if (data)
      validateInsertCategory(data, setAlertMessage, () => {
        setAlertMessage({
          message: `${isEdit ? 'Chỉnh sửa' : 'Tạo mới'} thành công`,
          type: 'success',
        });
        handleCloseForm();
      });
  };

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
        onSuccess: (resData) => handleInvalidate(resData),
      });
      return;
    }
    // create new campaign
    mutationCreateCampaign(data, {
      onSuccess: (resData) => handleInvalidate(resData),
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

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
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
    navigate(`/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CAMPAIGN}`);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        {campaignId ? 'Chi tiết Campaign' : 'Tạo mới Campaign'}
      </Title>
      <CampaignDetailSearch
        initialValues={dataSourcesDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
        dataSource={dataSourcesTarget.targets}
        isDisabled={Boolean(isAction)}
        onShowForm={handleShowForm}
        onShowTargetForm={handleShowTargetForm}
        form={form}
      />
      <div className="mb-24" />
      <CampaignDetailTable
        onSort={handleSort}
        onEdit={handleApproachEdit}
        dataSource={dataSources}
        paginations={paginations}
        onShowApproachForm={handleShowApproachForm}
      />
      <div
        className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 px-4"
        hidden={isViewMode}
      >
        <Flex justify="between" className="py-4 w-full px-6" gap="middle">
          {isAction ? (
            <AButton
              onClick={handleBack}
              type="primary"
              variant="filled"
              data-testid="back-button"
            >
              {BUTTON_TEXT.BACK}
            </AButton>
          ) : (
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
          )}
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
        alertProps={{ ...alertMessage, setMessage: setAlertMessage }}
      >
        <CampaignTargetForm
          isViewMode={isViewMode}
          onClose={handleCloseForm}
          initialValues={initTargetValues}
          onSubmit={handleSaveTarget}
        />
      </ODrawer>
      <ODrawer
        usePrefixTitle
        title="kế hoạch tiếp cận"
        mode={showInsertApproachForm}
        onClose={handleShowApproachForm}
        open={!!showInsertApproachForm}
        width={1080}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
        alertProps={{ ...alertMessage, setMessage: setAlertMessage }}
      >
        <CampaignApproachForm
          isViewMode={isViewModeTarget}
          onClose={handleCloseForm}
          initialValues={initApproachValues}
          onSubmit={handleSaveApproach}
        />
      </ODrawer>
    </div>
  );
};

export default ManagerCampaignDetail;
