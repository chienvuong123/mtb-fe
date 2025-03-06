/* eslint-disable no-param-reassign */
import { LockIcon, SwitchIcon, UnlockIcon } from '@assets/icons';
import { AButton, AInputNumber } from '@components/atoms';
import { OTable } from '@components/organisms';
import type {
  AssignmentSellerRequestDTO,
  AssignmentSellerResponseDTO,
} from '@dtos';
import { Button, Flex, Form } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import FormItem from 'antd/es/form/FormItem';
import type { ColumnType } from 'antd/es/table';
import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import {
  useSellerAddToCampaignMutation,
  useSellerAssignCustomerMutation,
} from '@hooks/queries';
import { useNotification } from '@libs/antd';
import { OModalConfirm } from '@components/organisms/o-modal';
import { SellerAddFormDrawer, SellerAssignmentActions } from '.';
import {
  distributeCustomers,
  getDataSplitSeller,
  getMaxQuantity,
} from '../sallerHelper';

export type TSellerRecord = AssignmentSellerResponseDTO;

interface ISellerTable {
  campaignId?: string;
  dataSource: TSellerRecord[];
  totalCustomer: number;
  refetchSellerList?: () => void;
}

const SellerTable: FC<ISellerTable> = ({
  campaignId,
  dataSource,
  totalCustomer,
  refetchSellerList,
}) => {
  const [form] = Form.useForm();
  const watchForm = Form.useWatch([], form);
  const notify = useNotification();

  const [showDrawer, setShowDrawer] = useState(false);
  const [tableRecords, setTableRecords] = useState<TSellerRecord[]>([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const { mutate: assignCustomerMutate } = useSellerAssignCustomerMutation();
  const { mutate: addToCampaignMutate } = useSellerAddToCampaignMutation();

  const handleStopDivide = useCallback(
    (fieldName: string, record: TSellerRecord) => {
      const isLock = !form.getFieldValue(fieldName);
      form.setFieldValue(fieldName, isLock);
      form.setFieldValue(`quantity_${record.sellerId}`, 0);
      setTableRecords((pre) => {
        const newItems = [...pre];
        const idx = pre.findIndex((i) => i.sellerId === record?.sellerId);
        if (idx !== -1) {
          newItems[idx] = {
            ...newItems[idx],
            assignNumber: 0,
            isLock,
          };
        }
        return newItems;
      });
    },
    [form],
  );
  const handlePushToTop = useCallback(
    (record: TSellerRecord) => {
      setTableRecords((pre) => [
        { ...record, isTop: true },
        ...pre
          .filter((i) => i.sellerId !== record.sellerId)
          .map((i) => ({ ...i, isTop: false })),
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const columns = useMemo(() => {
    const columnList: ColumnType<TSellerRecord>[] = [
      {
        title: 'Seller',
        dataIndex: 'sellerId',
        width: 535,
        minWidth: 535,
        render: (value, record) => `${value} - ${record.sellerName}`,
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        width: 176,
        minWidth: 176,
        render: (_, record) => {
          const maxQuantity = getMaxQuantity(
            totalCustomer,
            record.sellerId,
            form,
          );
          const fieldName = `quantity_${record?.sellerId}`;
          return (
            <FormItem name={fieldName}>
              <AInputNumber
                controls
                min={0}
                max={maxQuantity > 0 ? maxQuantity : 0}
                disabled={form.getFieldValue(`isLock_${record?.sellerId}`)}
                onBlur={({ target: { value } }) => {
                  if (!value) {
                    form.setFieldValue(fieldName, 0);
                  }
                }}
              />
            </FormItem>
          );
        },
      },
      {
        title: 'Dừng chia',
        align: 'center',
        dataIndex: 'isLock',
        width: 314,
        minWidth: 314,
        render: (_, record) => {
          const fieldName = `isLock_${record?.sellerId}`;
          return (
            <FormItem name={fieldName}>
              <Button
                variant="text"
                type="text"
                onClick={() => handleStopDivide(fieldName, record)}
                icon={
                  form.getFieldValue(fieldName) ? <LockIcon /> : <UnlockIcon />
                }
              />
            </FormItem>
          );
        },
      },
      {
        title: 'Đẩy lên đầu danh sách',
        align: 'center',
        dataIndex: 'isTop',
        width: 338,
        minWidth: 338,
        render: (_, record) => (
          <FormItem name={`isTop_${record?.sellerId}`}>
            <AButton
              icon={<SwitchIcon />}
              variant="text"
              type="text"
              onClick={() => handlePushToTop(record)}
            />
          </FormItem>
        ),
      },
    ];
    return columnList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, watchForm, handleStopDivide, handlePushToTop]);

  useEffect(() => {
    const tableRec: TSellerRecord[] = [];
    const sellerObj = dataSource.reduce((a, c, idx) => {
      a[`quantity_${c.sellerId}`] = 0;
      a[`isLock_${c.sellerId}`] = c?.isLock ?? false;
      a[`isTop_${c.sellerId}`] = idx === 0;

      tableRec.push({
        sellerId: c?.sellerId,
        sellerName: c?.sellerName,
        isTop: idx === 0,
        assignNumber: c?.assignNumber ?? 0,
        isLock: c?.isLock ?? false,
      });
      return a;
    }, {} as AnyObject);
    form.setFieldsValue(sellerObj);
    setTableRecords(
      tableRec.sort((a, b) => a.sellerId.localeCompare(b.sellerId)),
    );
  }, [dataSource, form]);

  const handleCloseDrawer = () => setShowDrawer(false);

  const handleCreateSeller = () => setShowDrawer(true);

  const handleUnlockAll = () => {
    const sellerObj = tableRecords.reduce((a, c) => {
      a[`isLock_${c.sellerId}`] = false;
      return a;
    }, {} as AnyObject);
    form.setFieldsValue(sellerObj);
    setTableRecords((pre) => pre.map((i) => ({ ...i, isLock: false })));
  };

  const handleDivide = () => {
    form.setFieldsValue(
      distributeCustomers(totalCustomer, tableRecords, form).reduce((a, c) => {
        a[`quantity_${c.sellerId}`] = c.customerQuantity;
        return a;
      }, {} as AnyObject),
    );
  };

  const handleConfirmDivide = () => {
    const lockItem = tableRecords.find((i) => i.isLock);
    if (lockItem) {
      setShowModalConfirm(true);
    } else {
      handleDivide();
    }
  };

  const handleSubmit = () => {
    if (!campaignId) return;

    const { data: dataSplitSellerDtos, totalQuantity } = getDataSplitSeller(
      form.getFieldsValue(),
      tableRecords,
    );
    const data: AssignmentSellerRequestDTO = {
      campaignId,
      totalQuantity,
      dataSplitSellerDtos,
    };

    assignCustomerMutate(data, {
      onSuccess: ({ errorCode, errorDesc }) => {
        if (errorCode !== '0') {
          // if error
          notify({ message: errorDesc, type: 'error' });
          return;
        }
        // if success
        notify({
          message: 'Lưu thành công',
          type: 'success',
        });
        refetchSellerList?.();
      },
    });
  };

  const handleAddSeller = (sellerIds: string[], reset: () => void) => {
    if (sellerIds.length === 0) {
      notify({
        message: 'Chưa có seller nào được chọn',
        type: 'error',
      });
      return;
    }
    if (campaignId)
      addToCampaignMutate(
        { campaignId, data: sellerIds },
        {
          onSuccess: (data) => {
            if (data.errorCode !== '0') {
              // if error
              notify({ message: data.errorDesc, type: 'error' });
              return;
            }
            // if success
            notify({
              message: 'Thêm seller vào campaign thành công',
              type: 'success',
            });
            reset();
            refetchSellerList?.();
          },
        },
      );
  };

  return (
    <div>
      <OModalConfirm
        open={showModalConfirm}
        title="Thông báo"
        content="Có seller bị khoá, bạn có chắc chắn muốn chia đều"
        onCancel={() => setShowModalConfirm(false)}
        onOk={() => {
          handleDivide();
          setShowModalConfirm(false);
        }}
      />

      <SellerAddFormDrawer
        open={showDrawer}
        onClose={handleCloseDrawer}
        onSubmit={handleAddSeller}
        campaignId={campaignId as string}
      />

      <SellerAssignmentActions
        disabledCreate={!campaignId}
        disabledDivide={!campaignId}
        totalCustomer={totalCustomer}
        onCreateSeller={handleCreateSeller}
        onDivide={handleConfirmDivide}
        onUnlockAll={handleUnlockAll}
      />

      <Form form={form} onFinish={handleSubmit}>
        <OTable<TSellerRecord>
          rowKey="sellerId"
          isCheckboxHidden
          hideActions
          columns={columns}
          data={tableRecords}
          scroll={{ x: 1573 }}
        />
        <Flex justify="end" className="bg-white pr-32 py-16">
          <Flex gap={24}>
            <AButton color="primary" variant="filled">
              Huỷ
            </AButton>
            <AButton
              type="primary"
              htmlType="submit"
              disabled={!tableRecords.length}
            >
              Lưu
            </AButton>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default SellerTable;
