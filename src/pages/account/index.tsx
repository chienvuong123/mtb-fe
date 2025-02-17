import { useEffect } from 'react';
import useFormItems from '@hooks/useFormItems';
import { Avatar, Divider, Flex, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AButton } from '@components/atoms';
import { EStatus } from '@constants/masterData';
import { useUserEditMutation } from '@hooks/queries';
import type { UserDTO } from '@dtos';
import { useProfile } from '../../stores';
import useFieldRender from './hooks/useFieldRender';

import './index.scss';

const AccountPage = () => {
  const [form] = useForm();
  const { items } = useFieldRender();
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [16, 24] },
  });
  const { user } = useProfile();

  const { mutate: userEditMutate } = useUserEditMutation();

  const handleUpdateProfile = (values: UserDTO) => {
    userEditMutate({
      fullName: values.fullName,
      email: values.email,
      phoneNum: values.phoneNum,
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
      <img
        src="src/assets/images/account_header.png"
        className="h-75 w-full"
        alt=""
      />

      <Flex align="center" className="h-full" vertical>
        {/* BE not work */}
        <Flex vertical className="mt-57">
          <Avatar className="h-80 w-80" shape="circle" />
          <p className="color-main1 mt-16 pb-48">Upload Photo</p>
        </Flex>

        <Flex flex={1}>
          <Form
            className="account-form"
            layout="vertical"
            form={form}
            onFinish={handleUpdateProfile}
          >
            <Flex className="px-56">{formContent}</Flex>

            <Flex vertical align="end" justify="flex-end" flex={1}>
              <Divider className="divider-bottom" />
              <div className="pr-34 py-12">
                <AButton type="primary" htmlType="submit">
                  Lưu
                </AButton>
              </div>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountPage;
