import { Button, Flex } from 'antd';

const ButtonExample = () => (
  <>
    <Flex className="mb-24" gap="small" wrap>
      <Button size="small" type="primary">
        Primary Button
      </Button>
      <Button size="small">Default Button</Button>
      <Button size="small" type="dashed">
        Dashed Button
      </Button>
      <Button size="small" type="text">
        Text Button
      </Button>
      <Button size="small" type="link">
        Link Button
      </Button>
      <Button danger size="small" type="primary">
        Danger Button
      </Button>
    </Flex>
    <Flex className="mb-24" gap="small" wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
      <Button danger type="primary">
        Danger Button
      </Button>
    </Flex>
    <Flex className="mb-24" gap="small" wrap>
      <Button size="large" type="primary">
        Primary Button
      </Button>
      <Button size="large">Default Button</Button>
      <Button size="large" type="dashed">
        Dashed Button
      </Button>
      <Button size="large" type="text">
        Text Button
      </Button>
      <Button size="large" type="link">
        Link Button
      </Button>
      <Button danger size="large" type="primary">
        Danger Button
      </Button>
    </Flex>
  </>
);

export default ButtonExample;
