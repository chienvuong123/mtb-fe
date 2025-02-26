/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { filterObject } from '@utils/objectHelper';
import dayjs from 'dayjs';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  TCampaignSearchForm,
} from 'src/dtos/campaign';
import {
  useCampaignAddMutation,
  useCampaignDownloadTemplete,
  useCampaignEditMutation,
  useCampaignExport,
  useCampaignImportMutation,
  useCampaignRemoveMutation,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@stores';
import { MANAGER_CATEGORY } from '@routers/path';
import { ExportIcon, ImportIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import { OUploadPopup } from '@components/organisms/o-upload-popup';
import type { UploadFile } from 'antd/lib';
import { downloadBase64File } from '@utils/fileHelper';
import type { TDrawerMsg } from '@components/organisms';
import CampaignTable, {
  type TCampaignRecord,
} from './components/CampaignTable';
import CampaignSearch from './components/CampaignSearch';
import {
  downloadFileByGetMethod,
  validateInsertCustomer,
} from './hook/campaignHelper';
import './index.scss';

let abortController = new AbortController();

const Campaign: React.FC = () => {
  const [initValues, setInitValues] = useState<Partial<TCampaignRecord> | null>(
    null,
  );

  const { isAdmin, isCampaignManager } = useProfile();
  const [showExport, setShowImport] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [alertMessage, setAlertMessage] = useState<TDrawerMsg>({});
  const [uploadError, setUploadError] = useState<string | boolean>(false);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CampaignDTO>>();

  const navigate = useNavigate();

  const searchParams: CampaignSearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      ...filterObject(filters),
    }),
    [current, pageSize, sort, filters],
  );

  const { data: campaignRes, refetch: refetchCampaign } =
    useCampaignSearchQuery(searchParams);

  const handleReset = () => {
    setInitValues(null);
  };

  const { mutate: mutationCreateCampign } = useCampaignAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateCampaign } = useCampaignEditMutation(
    {},
    handleReset,
  );
  const { mutate: mutationDeleteProducts } = useCampaignRemoveMutation();
  const { mutate: mutationImportCampaign, isPending: importCustomerLoading } =
    useCampaignImportMutation();
  const { refetch: downloadTemplate } = useCampaignDownloadTemplete();
  const { refetch: customerExport } = useCampaignExport(searchParams);

  const cancelImport = () => {
    abortController?.abort();
  };

  const handleCreate = () => {
    setInitValues({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      startDate: dayjs().format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });

    navigate(`/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CREATE_CAMPAIGN}`);
  };

  const handleEdit = (data: TCampaignRecord) => {
    setInitValues({
      ...data,
      startDate: dayjs(data.startDate).format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });

    if (data?.id) {
      navigate(
        `/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CAMPAIGN_DETAIL}/${data.id}`,
      );
    }
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleSubmitInsert = ({ name, code, status }: CampaignDTO) => {
    const data: Partial<CampaignDTO> = {
      code,
      name,
      status,
      id: initValues?.id,
    };
    // update campaign
    if (data?.id) {
      mutationUpdateCampaign(data);
      return;
    }
    // create new campaign
    mutationCreateCampign(data);
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts({ id });
  };

  const handleImportCustomer = (file: UploadFile[]) => {
    abortController = new AbortController();
    if (file?.[0]?.originFileObj) {
      mutationImportCampaign(
        {
          file: file[0]?.originFileObj,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setProgressPercent(percent);
          },
          signal: abortController.signal,
        },
        {
          onSuccess: (d) => {
            validateInsertCustomer(d, setAlertMessage, () => {
              setAlertMessage({
                message: 'Import thành công',
                type: 'success',
              });
              setShowImport(false);
              setProgressPercent(0);
              if (current !== 1) {
                setPagination((pre) => ({ ...pre, current: 1 }));
              } else {
                refetchCampaign();
              }
            });
            if (d?.errorCode === 'CUS0009') {
              downloadBase64File(d.data as string, 'DSKH_error.xlsx');
            }
          },
          onError: () => {
            setProgressPercent(0);
            setUploadError(true);
          },
        },
      );
    }
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: campaignRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const dataSources: TCampaignRecord[] =
    useMemo(
      () =>
        campaignRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [campaignRes],
    ) ?? [];

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = campaignRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CAMPAIGN_DETAIL}/${id}?isView=${true}`,
      );
      setInitValues({ ...item });
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  // TODO: will be removed
  console.log(handleSubmitInsert, alertMessage);

  return (
    <div className="pt-32">
      <OUploadPopup
        progress={progressPercent}
        setProgress={setProgressPercent}
        modalProps={{
          open: showExport,
          title: 'Tải lên danh sách khách hàng',
          onCancel: () => {
            setShowImport(false);
            setProgressPercent(0);
          },
        }}
        onSubmit={handleImportCustomer}
        onDownloadEg={() =>
          downloadFileByGetMethod(downloadTemplate, 'DSKH_Template.xlsx')
        }
        onCancelImport={cancelImport}
        showError={uploadError}
        setError={setUploadError}
        disabled={importCustomerLoading}
      />
      <Flex justify="space-between" className="mb-14">
        <Title level={3} className="mb-0">
          Danh sách Campaign
        </Title>
        <Flex gap={16}>
          {(isAdmin || isCampaignManager) && (
            <AButton
              variant="filled"
              color="primary"
              icon={<ImportIcon />}
              onClick={() => setShowImport(true)}
            >
              Import
            </AButton>
          )}
          <AButton
            variant="filled"
            color="primary"
            icon={<ExportIcon />}
            onClick={() => downloadFileByGetMethod(customerExport, 'DSKH.xlsx')}
          >
            Export
          </AButton>
        </Flex>
      </Flex>
      <CampaignSearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filters}
        onCreate={handleCreate}
      />
      <div className="mb-24" />
      <CampaignTable
        dataSource={dataSources}
        paginations={paginations}
        sortDirection={sort}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />
    </div>
  );
};

export default Campaign;
