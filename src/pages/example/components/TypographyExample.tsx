import { Typography } from 'antd';

const { Title, Text, Paragraph, Link } = Typography;

const newLocal = (
  <>
    <div className="primary fs-20 fw-600 mr-8 mb-8 pa-8 pb-8 dis-flex jc-center border-1 border-solid w-100">
      213
    </div>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
    <Paragraph>p. Ant Design</Paragraph>
    <Text>span. Ant Design</Text>
    <br />
    <Link href="https://ant.design" target="_blank">
      a. Link
    </Link>
  </>
);
const TypographyExample = () => {
  return newLocal;
};

export default TypographyExample;
