import { useMemo, useState, type FC } from 'react';
import {
  Tree,
  Button,
  Flex,
  Dropdown,
  Typography,
  Row,
  Col,
  Card,
  Empty,
  Modal,
  Select,
  message,
  Tooltip,
  Badge,
  Form,
  Input,
  Divider,
} from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import type { ApproachScriptAttributeDTO } from '@dtos';
import { useLocation } from 'react-router-dom';
import './ScenarioTree.scss';
import AttributeItemPreview from './AttributeItemPreview';

export interface TreeAttributeNode extends DataNode {
  id: string;
  attributeName: string;
  controlType: string;
  controlName: string;
  haveNote: boolean;
  description: string;
  content?: string | null;
  controlCode?: string;
  controlId?: string;
  parentId?: string;
  linkedToNodeId?: string; // ID của node được liên kết
  isLinkNode?: boolean; // Đánh dấu đây là node con được tạo từ liên kết
  children?: TreeAttributeNode[];
}

interface ScenarioTreeProps {
  dataSource: ApproachScriptAttributeDTO[];
  onEdit: (data: ApproachScriptAttributeDTO) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  onUpdate?: (id: string, data: Partial<ApproachScriptAttributeDTO>) => void;
}

// Form tạo node liên kết
interface LinkFormValues {
  linkedNodeId: string;
  linkNodeName: string;
}

const formatTreeData = (
  data: ApproachScriptAttributeDTO[],
): TreeAttributeNode[] => {
  // Tạo map lưu trữ tất cả node theo id
  const nodeMap: Record<string, TreeAttributeNode> = {};

  // Tạo TreeNode từ attributeData
  data.forEach((item) => {
    nodeMap[item.id] = {
      key: item.id,
      id: item.id,
      title: item.attributeName,
      attributeName: item.attributeName,
      controlType: item.controlType,
      controlName: item.controlName,
      haveNote: item.haveNote,
      description: item.description,
      content: item.content,
      controlCode: item.controlCode,
      controlId: item.controlId,
      parentId: item.parentId,
      linkedToNodeId: (item as unknown as { linkedToNodeId?: string })
        .linkedToNodeId,
      isLinkNode: (item as unknown as { isLinkNode?: boolean }).isLinkNode,
      children: [],
    };
  });

  // Xây dựng cấu trúc cây
  const rootNodes: TreeAttributeNode[] = [];

  // Thêm node con vào node cha
  data.forEach((item) => {
    const node = nodeMap[item.id];

    if (item.parentId && nodeMap[item.parentId]) {
      // Nếu có parentId và parent tồn tại, thêm vào children của parent
      nodeMap[item.parentId].children?.push(node);
    } else {
      // Nếu không có parentId hoặc parent không tồn tại, đây là node gốc
      rootNodes.push(node);
    }
  });

  return rootNodes;
};

// Hàm tạo flat list từ cấu trúc cây
const flattenTreeData = (
  treeData: TreeAttributeNode[],
): TreeAttributeNode[] => {
  const result: TreeAttributeNode[] = [];

  const traverse = (nodes: TreeAttributeNode[]) => {
    nodes.forEach((node) => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };

  traverse(treeData);
  return result;
};

const ScenarioTree: FC<ScenarioTreeProps> = ({
  dataSource,
  onEdit,
  onDelete,
  onView,
  onAddChild,
  onUpdate,
}) => {
  const location = useLocation();
  const isViewMode = location.pathname.includes('/detail/');
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [form] = Form.useForm<LinkFormValues>();

  const treeData = formatTreeData(dataSource);
  const flatNodes = flattenTreeData(treeData);

  // Tìm node theo ID
  const findNodeById = (id: string): TreeAttributeNode | undefined => {
    return flatNodes.find((node) => node.id === id);
  };

  // Mở modal để liên kết node
  const handleOpenLinkModal = (nodeId: string) => {
    setCurrentNodeId(nodeId);
    const currentNode = findNodeById(nodeId);

    form.resetFields();
    if (currentNode?.linkedToNodeId) {
      form.setFieldsValue({
        linkedNodeId: currentNode.linkedToNodeId,
        linkNodeName: '',
      });
    }

    setLinkModalOpen(true);
  };

  // Tạo ID mới cho node
  const generateNodeId = () => `node_${Date.now()}`;

  // Xử lý khi lưu liên kết
  const handleSaveLink = async () => {
    try {
      const values = await form.validateFields();

      if (currentNodeId && onUpdate && values.linkedNodeId) {
        const targetNode = findNodeById(values.linkedNodeId);

        if (!targetNode) {
          message.error('Node đích không tồn tại');
          return;
        }

        if (values.linkNodeName) {
          // Tạo node con mới
          const newNode: Partial<ApproachScriptAttributeDTO> = {
            id: generateNodeId(),
            attributeName: values.linkNodeName,
            controlType: 'LINK',
            controlName: `Link đến: ${targetNode.attributeName}`,
            haveNote: false,
            description: `Node này liên kết đến ${targetNode.attributeName}`,
            parentId: currentNodeId,
            linkedToNodeId: values.linkedNodeId,
            isLinkNode: true,
          } as Partial<ApproachScriptAttributeDTO>;

          // Thêm node con vào danh sách
          dataSource.push(newNode as ApproachScriptAttributeDTO);
          message.success('Đã tạo node liên kết thành công');
        } else {
          // Liên kết trực tiếp node hiện tại
          onUpdate(currentNodeId, {
            linkedToNodeId: values.linkedNodeId,
          } as Partial<ApproachScriptAttributeDTO>);
          message.success('Đã liên kết node thành công');
        }
      }

      setLinkModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const renderTreeActions = (node: TreeAttributeNode) => {
    const items = [
      {
        key: 'view',
        label: 'Xem',
        icon: <EyeOutlined />,
        onClick: () => onView(node.id),
      },
    ];

    if (!isViewMode) {
      // Nếu không phải là node liên kết thì mới cho phép sửa
      if (!node.isLinkNode) {
        items.push({
          key: 'edit',
          label: 'Sửa',
          icon: <EditOutlined />,
          onClick: () => onEdit(node as ApproachScriptAttributeDTO),
        });
      }

      items.push(
        {
          key: 'linkTo',
          label: 'Link tới node khác',
          icon: <LinkOutlined />,
          onClick: () => handleOpenLinkModal(node.id),
        },
        {
          key: 'addChild',
          label: 'Thêm lựa chọn',
          icon: <PlusOutlined />,
          onClick: () => onAddChild?.(node.id),
        },
        {
          key: 'delete',
          label: 'Xóa',
          icon: <DeleteOutlined />,
          onClick: () => onDelete(node.id),
        },
      );
    }

    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Button
          type="text"
          icon={<MoreOutlined />}
          className="tree-node-action-button"
        />
      </Dropdown>
    );
  };

  const renderTreeNode = (node: TreeAttributeNode): TreeAttributeNode => ({
    ...node,
    title: (
      <Flex
        align="center"
        justify="space-between"
        className="tree-node-container"
      >
        <Typography.Text
          ellipsis
          className={`tree-node-title ${
            selectedNodeKey === node.key ? 'tree-node-selected' : ''
          } ${node.isLinkNode ? 'tree-node-link' : ''}`}
        >
          {node.linkedToNodeId || node.isLinkNode ? (
            <Tooltip
              title={`Liên kết đến ${findNodeById(node.linkedToNodeId || '')?.attributeName || 'node khác'}`}
            >
              <Badge
                count={<LinkOutlined style={{ color: '#1677ff' }} />}
                offset={[10, 6]}
              >
                {node.attributeName}
              </Badge>
            </Tooltip>
          ) : (
            node.attributeName
          )}
          <Typography.Text type="secondary" className="tree-node-type">
            {node.controlName}
          </Typography.Text>
        </Typography.Text>
        {renderTreeActions(node)}
      </Flex>
    ),
    children: node.children?.map((child) => renderTreeNode(child)),
  });

  const treeNodes = treeData.map((node) => renderTreeNode(node));

  const handleSelect: TreeProps['onSelect'] = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      const nodeId = selectedKeys[0].toString();
      const node = findNodeById(nodeId);

      // Nếu node có liên kết đến node khác, tự động chuyển đến node đó
      if (node?.linkedToNodeId) {
        const linkedId = node.linkedToNodeId;
        setSelectedNodeKey(linkedId);

        // Mở rộng cây để hiển thị node liên kết
        const linkedNode = findNodeById(linkedId);
        if (linkedNode && linkedNode.parentId) {
          // Đảm bảo tất cả các node cha được mở rộng
          const parentsToExpand: string[] = [];
          let currentParentId: string | null = linkedNode.parentId;

          while (currentParentId) {
            parentsToExpand.push(currentParentId);
            const parentNode = findNodeById(currentParentId);
            currentParentId = parentNode?.parentId || null;
          }

          setExpandedKeys((prevKeys) => {
            const newKeys = new Set([
              ...prevKeys,
              ...parentsToExpand,
              linkedId,
            ]);
            return [...newKeys];
          });
        }
      } else {
        setSelectedNodeKey(nodeId);
      }
    }
  };

  const handleExpand: TreeProps['onExpand'] = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
  };

  const selectedNode = useMemo(() => {
    return dataSource.find((item) => item.id === selectedNodeKey);
  }, [dataSource, selectedNodeKey]);

  return (
    <div className="scenario-tree-container">
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Kịch bản"
            className="tree-card"
            bodyStyle={{
              padding: '0 8px',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <Tree
              showLine
              onSelect={handleSelect}
              onExpand={handleExpand}
              expandedKeys={expandedKeys}
              defaultExpandAll
              treeData={treeNodes}
              blockNode
              className="scenario-custom-tree"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Chi tiết Attribute"
            className="preview-card"
            bodyStyle={{
              padding: '16px',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {selectedNodeKey && selectedNode ? (
              <div className="attribute-preview">
                {selectedNode.id !== selectedNodeKey && (
                  <Typography.Text type="secondary" className="linked-info">
                    <LinkOutlined /> Đang xem node được liên kết từ:{' '}
                    {findNodeById(selectedNodeKey)?.attributeName}
                  </Typography.Text>
                )}
                <Typography.Title level={5} className="mb-16">
                  {selectedNode.attributeName}
                </Typography.Title>
                <AttributeItemPreview previewData={selectedNode} />
              </div>
            ) : (
              <Empty description="Vui lòng chọn một attribute để xem chi tiết" />
            )}
          </Card>
        </Col>
      </Row>

      {/* Modal để liên kết node */}
      <Modal
        title="Liên kết tới node khác"
        open={linkModalOpen}
        onOk={handleSaveLink}
        onCancel={() => setLinkModalOpen(false)}
        okText="Lưu liên kết"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="linkedNodeId"
            label="Chọn node bạn muốn liên kết đến"
            rules={[{ required: true, message: 'Vui lòng chọn node đích' }]}
          >
            <Select
              placeholder="Chọn node đích"
              allowClear
              options={flatNodes
                .filter((node) => node.id !== currentNodeId) // Loại bỏ node hiện tại
                .map((node) => ({
                  label: `${node.attributeName} (${node.controlName})`,
                  value: node.id,
                }))}
              optionFilterProp="label"
              showSearch
            />
          </Form.Item>

          <Divider>
            <Typography.Text type="secondary">
              Tùy chọn nâng cao
            </Typography.Text>
          </Divider>

          <Form.Item
            name="linkNodeName"
            label="Tạo node con liên kết (tùy chọn)"
            help="Nếu nhập tên, hệ thống sẽ tạo một node con mới thay vì liên kết trực tiếp node hiện tại"
          >
            <Input placeholder="Tên của node con mới (Ví dụ: Chuyển đến bước X)" />
          </Form.Item>

          <Typography.Text type="secondary">
            Khi người dùng chọn node này, hệ thống sẽ tự động chuyển đến node
            được liên kết.
          </Typography.Text>
        </Form>
      </Modal>
    </div>
  );
};

export default ScenarioTree;
