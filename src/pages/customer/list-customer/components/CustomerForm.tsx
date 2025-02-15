import { OBaseForm } from '@components/organisms';
import { type FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { CUSTOMER_KEY } from '@hooks/queries';
import type { ICustomerForm, TCustomerForm } from '../customer.type';
import { useCustomerForm } from '../hooks';

const CustomerAddForm: FC<ICustomerForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();
  const { formItems, handleSubmit, handleClose } = useCustomerForm({
    mode,
    initialValues,
    form,
    onSubmit,
    onClose,
  });

  return (
    <OBaseForm<TCustomerForm>
      mutationKey={CUSTOMER_KEY}
      items={formItems}
      form={form}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};

export default CustomerAddForm;
