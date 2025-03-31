import { useEffect } from 'react';
import { Avatar, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { EStatus } from '@constants/masterData';
import { USER_KEY, useUserEditMutation } from '@hooks/queries';
import type { UserDTO } from '@dtos';
import accountHeader from '@assets/images/account_header.png';
import { OBaseForm } from '@components/organisms';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useProfile } from '../../stores';
import useFieldRender from './hooks/useFieldRender';

import './index.scss';

const AccountPage = () => {
  const [form] = useForm();
  const { items } = useFieldRender();

  const notify = useNotification();
  const { user, refetch } = useProfile();

  const { mutate: userEditMutate } = useUserEditMutation();

  const handleUpdateProfile = (values: UserDTO) => {
    userEditMutate(
      {
        fullName: values.fullName,
        email: values.email,
        phoneNum: values.phoneNum,
      },
      {
        onSuccess: (d) =>
          validationHelper(d, notify, () => {
            notify({ message: 'Chỉnh sửa thành công', type: 'success' });
            refetch();
          }),
      },
    );
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        status:
          user.status === EStatus.ACTIVE ? 'Đang hoạt động' : 'Không hoạt động',
      });
    }
  }, [user, form]);

  return (
    <Flex className="account-page bg-white h-full rounded-8" vertical>
      <img src={accountHeader} className="h-75 w-full" alt="" />

      <Flex align="center" className="h-full" vertical>
        <Flex vertical className="mt-57">
          <Avatar className="h-80 w-80" shape="circle" style={{ fontSize: 40 }}>
            {user?.fullName?.charAt(0).toLocaleUpperCase()}
          </Avatar>
        </Flex>

        <Flex flex={1}>
          <OBaseForm
            mutationKey={USER_KEY}
            className="account-form"
            form={form}
            onSubmit={handleUpdateProfile}
            items={items}
            cancelBtnProps={{ hidden: true }}
            footerProps={{
              justify: 'flex-end',
              className: 'py-12 pr-40',
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountPage;
