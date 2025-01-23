import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import TypographyExample from './components/TypographyExample';
import FlexExample from './components/FlexExample';
import CheckboxExample from './components/CheckboxExample';
import ButtonExample from './components/ButtonExample';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Typography',
    children: <TypographyExample />,
  },
  {
    key: '2',
    label: 'Flex',
    children: <FlexExample />,
  },
  {
    key: '3',
    label: 'Checkbox',
    children: <CheckboxExample />,
  },
  {
    key: '4',
    label: 'Button',
    children: <ButtonExample />,
  },
];

const ExamplePage = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
  );
};

export default ExamplePage;
