import { ControlImageIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { PATH_SEGMENT } from '@routers/path';
import { buildPath } from '@routers/utils';
import { Card, Col, Flex, Row, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const mediaTypes = [
  {
    title: 'Hình ảnh',
    description: 'Khu vực quản lý hình ảnh',
    icon: <ControlImageIcon />,
    path: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.IMAGE]),
  },
  {
    title: 'Hình động',
    description: 'Khu vực quản lý hình động',
    icon: <ControlImageIcon />,
    path: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.ANIMATED]),
  },
  {
    title: 'Văn bản',
    description: 'Khu vực quản lý văn bản',
    icon: <ControlImageIcon />,
    path: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.DOCUMENT]),
  },
  {
    title: 'Video',
    description: 'Khu vực quản lý video',
    icon: <ControlImageIcon />,
    path: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.VIDEO]),
  },
  {
    title: 'Âm thanh',
    description: 'Khu vực quản lý âm thanh',
    icon: <ControlImageIcon />,
    path: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.AUDIO]),
  },
];

const MultimediaWarehousePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Kho đa phương tiện
      </Title>
      <Row gutter={[24, 24]}>
        {mediaTypes.map((item) => (
          <Col span={8} key={item.title}>
            <Typography.Text className="multimedia-title-color">
              {item.title}
            </Typography.Text>
            <Card className="py-24">
              <Card.Meta className="text-center" />
              <Flex justify="center">{item.icon}</Flex>
              <Typography.Text className="dis-block text-center mt-16 multimedia-desc-color">
                {item.description}
              </Typography.Text>
              <Flex justify="center" className="mt-16">
                <AButton
                  color="primary"
                  variant="filled"
                  onClick={() => navigate(item.path)}
                >
                  Xem chi tiết
                </AButton>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MultimediaWarehousePage;
