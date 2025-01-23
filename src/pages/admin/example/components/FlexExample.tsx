import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';
import { useState } from 'react';

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];

const FlexExample = () => {
  const [justify, setJustify] = useState<FlexProps['justify']>(
    justifyOptions[0],
  );
  const [alignItems, setAlignItems] = useState<FlexProps['align']>(
    alignOptions[0],
  );
  return (
    <Flex gap="middle" align="start" vertical>
      <p>Select justify :</p>
      <Segmented
        options={justifyOptions}
        onChange={setJustify as SegmentedProps['onChange']}
      />
      <p>Select align :</p>
      <Segmented
        options={alignOptions}
        onChange={setAlignItems as SegmentedProps['onChange']}
      />
      <Flex
        className="w-full h-100 border-1"
        justify={justify}
        align={alignItems}
      >
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
  );
};

export default FlexExample;
