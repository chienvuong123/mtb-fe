import { ArrowDown01Icon } from '@assets/icons';
import { ADropdown } from '@components/atoms';
import { Avatar, Flex, type MenuProps } from 'antd';
import React from 'react';

interface IMHeaderInfo {
  itemsDropdown: MenuProps['items'];
}

const MHeaderInfo: React.FC<IMHeaderInfo> = ({ itemsDropdown }) => {
  return (
    <Flex justify="space-between" align="center">
      <ADropdown items={itemsDropdown} trigger={['click']}>
        <Flex gap={12} align="center">
          <Avatar>user</Avatar>

          <Flex vertical>
            <h6>Trần Đức Long</h6>
            <span className="lh-150">Manager</span>
          </Flex>

          <ArrowDown01Icon />
        </Flex>
      </ADropdown>
    </Flex>
  );
};

export default MHeaderInfo;
