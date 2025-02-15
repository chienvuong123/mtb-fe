import { OBaseForm } from '@components/organisms';
import { type FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { CUSTOMER_KEY } from '@hooks/queries';
import type { ICustomerForm, TCustomerForm } from '../customer.type';
import { useCustomerForm } from '../hooks';

const CustomerAddForm: FC<Pick<ICustomerForm, 'initialValues' | 'onClose'>> = ({
  initialValues,
  onClose,
}) => {
  const [form] = useForm();
  const { formItems } = useCustomerForm({
    mode: 'view',
    initialValues,
    form,
  });

  return (
    <OBaseForm<TCustomerForm>
      mutationKey={CUSTOMER_KEY}
      items={formItems}
      form={form}
      onClose={onClose}
    />
  );
};

export default CustomerAddForm;
