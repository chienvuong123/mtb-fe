import { NotificationIcon } from '@assets/icons';
import { Badge, Flex } from 'antd';

const MHeaderNotify = () => {
  return (
    <Badge count={5} offset={[-6, 6]}>
      <Flex className="h-40 w-40" justify="center">
        <NotificationIcon />
      </Flex>
    </Badge>
  );
};

export default MHeaderNotify;
