import React from 'react';
import { AutoComplete, type AutoCompleteProps, type FormInstance } from 'antd';

interface IAutoComplete extends AutoCompleteProps {
  form?: FormInstance;
  name?: string;
}

const AAutoCompleteCurrency: React.FC<IAutoComplete> = ({
  form,
  name,
  ...props
}) => {
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>(
    [],
  );

  const handleSelect = (value: string) => {
    form?.setFieldValue(name, value);
  };

  const handleSearch = (value: string) => {
    if (Number(value) === 0) {
      setOptions([]);
      handleSelect('');
      return;
    }

    const v = value
      .replace(/^0+/, '') // Remove all leading zeros
      .replace(/\D/g, '') // Remove all non-numeric characters
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format dots

    handleSelect(v);

    setOptions(() => {
      return ['000', '000.000', '000.000.000'].map((suffix) => ({
        label: `${v}.${suffix}`,
        value: `${v}.${suffix}`,
      }));
    });
  };

  return (
    <AutoComplete
      onSearch={handleSearch}
      options={options}
      onSelect={handleSelect}
      {...props}
    />
  );
};

export default AAutoCompleteCurrency;
