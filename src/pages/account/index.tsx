import { useEffect } from 'react';
import useFormItems from '@hooks/useFormItems';
import { Avatar, Divider, Flex, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AButton } from '@components/atoms';
import { EStatus } from '@constants/masterData';
import { useUserStore } from '../../stores';
import useFieldRender from './hooks/useFieldRender';

const AccountPage = () => {
  const [form] = useForm();
  const { items } = useFieldRender();
  const { formContent } = useFormItems({
    formItems: items,
    rowProps: { gutter: [16, 24] },
  });
  const { user } = useUserStore();

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
    <Flex className="bg-white h-full rounded-8" vertical>
      <img
        src="src/assets/images/account_header.png"
        className="h-75 w-full"
        alt=""
      />

      <Flex className="px-56" align="center" flex={1} vertical>
        {/* BE not work */}
        <Flex vertical className="mt-57">
          <Avatar className="h-80 w-80" shape="circle" />
          <p className="color-main1 mt-16 pb-48">Upload Photo</p>
        </Flex>

        <Form layout="vertical" form={form}>
          {formContent}
        </Form>
      </Flex>

      <Flex vertical align="end">
        <Divider />
        <AButton type="primary" className="pr-34">
          Lưu
        </AButton>
      </Flex>
    </Flex>
  );
};

export default AccountPage;
