import React from 'react';
import { ArrowDown01Icon } from '@assets/icons';
import { ADropdown } from '@components/atoms';
import { Avatar, Badge, Flex, type MenuProps } from 'antd';
import { useUserStore } from '../../../stores';

interface IMHeaderInfo {
  itemsDropdown: MenuProps['items'];
}

const MHeaderInfo: React.FC<IMHeaderInfo> = ({ itemsDropdown }) => {
  const { user } = useUserStore();

  return (
    <Flex justify="space-between" align="center">
      <ADropdown
        items={itemsDropdown}
        trigger={['click']}
        overlayClassName="min-w-240"
      >
        <Flex gap={12} align="center">
          <Badge dot offset={[-5, 45]} color="green">
            <Avatar>{user?.firstName?.charAt(0).toLocaleUpperCase()}</Avatar>
          </Badge>

          <Flex vertical>
            <h6>{user?.fullName}</h6>
            <span className="lh-150">{user?.role}</span>
          </Flex>

          <ArrowDown01Icon />
        </Flex>
      </ADropdown>
    </Flex>
  );
};

export default MHeaderInfo;
