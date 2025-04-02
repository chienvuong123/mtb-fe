import { useEffect, useState } from 'react';
import { Avatar, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { EStatus } from '@constants/masterData';
import {
  USER_KEY,
  useUserEditMutation,
  useUserSendOtpUpdateEmailMutation,
  useUserVerifyOtpUpdateEmailMutation,
} from '@hooks/queries';
import type { BaseResponse, UserDTO } from '@dtos';
import accountHeader from '@assets/images/account_header.png';
import { OBaseForm } from '@components/organisms';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { useProfile } from '../../stores';
import useFieldRender from './hooks/useFieldRender';

import './index.scss';
import { OTPPopup } from './components';

const ProfilePage = () => {
  const [form] = useForm();
  const { items } = useFieldRender();

  const notify = useNotification();
  const { user, refetch } = useProfile();

  const navigate = useNavigate();

  const { mutate: userEditMutate } = useUserEditMutation();
  const { mutate: userSendOtpMutate } = useUserSendOtpUpdateEmailMutation();
  const { mutate: userVerifyOtpMutate } = useUserVerifyOtpUpdateEmailMutation();

  const [openPopup, setOpenPopup] = useState(false);

  const handleUpdateProfile = (values: UserDTO, ignoreCheckEmail?: boolean) => {
    if (values.email !== user?.email && !ignoreCheckEmail) {
      userSendOtpMutate(undefined, {
        onSuccess: (d) =>
          validationHelper(d, notify, () => {
            setOpenPopup(true);
          }),
      });
      return;
    }

    userEditMutate(
      {
        fullName: values.fullName,
        email: values.email,
        phoneNum: values.phoneNum,
        otp: values.otp,
      },
      {
        onSuccess: (d: BaseResponse<boolean>) => {
          validationHelper(d, notify, () => {
            notify({
              message: 'Cập nhật thông tin thành công',
              type: 'success',
            });
            refetch();
            setOpenPopup(false);
          });
        },
      },
    );
  };

  const handleSubmitOtp = (otp: string) => {
    userVerifyOtpMutate(otp, {
      onSuccess: (d) =>
        validationHelper(d, notify, () => {
          handleUpdateProfile({ ...form.getFieldsValue(), otp }, true);
        }),
    });
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
      <OTPPopup
        open={openPopup}
        email={user?.email ?? ''}
        onCancel={() => setOpenPopup(false)}
        onSubmit={handleSubmitOtp}
      />

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
            onSubmit={(values) => handleUpdateProfile(values)}
            onClose={() => navigate(ROUTES.HOME)}
            items={items}
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

export default ProfilePage;
