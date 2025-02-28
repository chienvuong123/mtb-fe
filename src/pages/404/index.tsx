import { NotFound } from '@assets/icons';
import { HOME } from '@routers/path';
import { Flex, Typography } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <Flex
      className="h-screen"
      justify="center"
      align="center"
      vertical
      gap={64}
    >
      <NotFound />
      <div className="text-center">
        <Typography.Title level={3}>Trang không tồn tại</Typography.Title>
        <Typography.Text className="error-gray mt-12">
          Rất tiếc, không thể tìm thấy trang bạn yêu cầu. Vui lòng quay lại
          &nbsp;
          <Link to={HOME}>trang chủ</Link>
        </Typography.Text>
      </div>
    </Flex>
  );
};

export default NotFoundPage;
