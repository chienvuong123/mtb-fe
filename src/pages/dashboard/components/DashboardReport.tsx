import React from 'react';
import { Card, Statistic, Row, Col, Flex } from 'antd';
import { CircleIcon, MarketingI02con, UserGroupIcon02 } from '@assets/icons';
import { useStatisticsCustomerOfDay } from '@hooks/queries/dashboardQueries';

const DashboardReport: React.FC = () => {
  const { data: statisticsCustomerOfDayData } = useStatisticsCustomerOfDay();
  const dataReport = statisticsCustomerOfDayData?.data;

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card>
          <Flex gap="middle" vertical>
            <CircleIcon />
            <Statistic
              title="Số campaing đang triển khai"
              value={dataReport?.totalCampaign}
            />
          </Flex>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Flex gap="middle" vertical>
            <MarketingI02con />
            <Statistic
              title="Số khách hàng trong ngày"
              value={dataReport?.totalCustomers}
            />
          </Flex>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Flex gap="middle" vertical>
            <UserGroupIcon02 />
            <Statistic
              title="Số khách hàng đang liên hệ trong ngày"
              value={dataReport?.contactedCustomers}
            />
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardReport;
