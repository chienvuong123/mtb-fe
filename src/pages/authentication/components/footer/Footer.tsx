import { Col, Divider, Flex, Row, Typography } from 'antd';
import {
  CalendarFavorite,
  CustomerService,
  Location09Icon,
  LogoOpenIcon,
} from '@assets/icons';

import './Footer.scss';

const { Title } = Typography;

const Footer = () => {
  return (
    <div className="footer-auth">
      <div className="footer-heading">
        <Title level={2} className="fw-500 mb-28">
          Liên hệ hỗ trợ
        </Title>

        <Row>
          <Col span={8}>
            <Flex gap={12}>
              <CustomerService className="h-32 w-32 footer-icon" />
              <Flex vertical>
                <Title level={4}>Gặp tư vấn viên</Title>

                <span className="footer-subtitle">
                  Vui lòng gọi để được tư vấn <br />
                  qua hotline 1900 545426
                </span>
              </Flex>
            </Flex>
          </Col>

          <Col span={8}>
            <Flex gap={12}>
              <CalendarFavorite className="h-32 w-32 footer-icon" />
              <Flex vertical>
                <Title level={4}>Đặt lịch hẹn</Title>

                <span className="footer-subtitle">
                  Tư vấn trực tiếp với chúng tôi
                  <br />
                  tại chi nhánh khi đặt lịch hẹn
                </span>
              </Flex>
            </Flex>
          </Col>

          <Col span={8}>
            <Flex gap={12}>
              <Location09Icon className="h-32 w-32 footer-icon" />
              <Flex vertical>
                <Title level={4}>Tìm chi nhánh/ATM</Title>

                <span className="footer-subtitle">
                  Mạng lưới điểm giao dịch tại
                  <br />
                  khu vực gần bạn
                </span>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </div>

      <Divider className="my-0" />

      <Flex align="center" justify="space-between" className="py-8">
        <LogoOpenIcon className="w-106 h-48" />

        <Flex className="footer-note">
          <span>© Bản quyền 2024 thuộc về MBbank</span>
          <Divider type="vertical" />
          <span>Thiết kết bởi MBbank</span>
        </Flex>
      </Flex>
    </div>
  );
};

export default Footer;
