import { OBaseForm } from '@components/organisms';
import { type FC } from 'react';
import { CUSTOMER_KEY } from '@hooks/queries';
import type { ICustomerForm, TCustomerForm } from '../customer.type';
import { useCustomerForm } from '../hooks';

const CustomerAddForm: FC<ICustomerForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const { form, formItems, handleSubmit, handleClose } = useCustomerForm({
    mode,
    initialValues,
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
