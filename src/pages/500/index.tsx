import { ServerError } from '@assets/icons';
import { ROUTES } from '@routers/path';
import { Flex, Typography } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const ServerErrorPage: FC = () => {
  return (
    <Flex
      className="h-screen"
      justify="center"
      align="center"
      vertical
      gap={64}
    >
      <ServerError />
      <div className="text-center">
        <Typography.Title level={3}>Lỗi Server</Typography.Title>
        <Typography.Text className="error-gray mt-12">
          Thử làm mới trang và vui lòng liên hệ nếu sự cố vẫn tiếp diễn
          <br />
          <Link to={ROUTES.HOME} className="mt-8">
            Quay vể trang chủ
          </Link>
        </Typography.Text>
      </div>
    </Flex>
  );
};

export default ServerErrorPage;
