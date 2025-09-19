import React from "react";
import { Table, Space, Tooltip, Button, Popconfirm, Avatar, Tag, Badge, Typography } from "antd";
import {
  BookOutlined,
  UserOutlined,
  TagOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  StarOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { genreColors, pageSizeOptions } from "../../utils/constants";

const { Text } = Typography;

const BookTable = ({
  books,
  currentPageNum,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: (
        <Space>
          <BookOutlined />
          Title
        </Space>
      ),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text, record) => (
        <Space>
          <Avatar src={record.cover} icon={<BookOutlined />} size="small" />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: (
        <Space>
          <UserOutlined />
          Author
        </Space>
      ),
      dataIndex: "author",
      key: "author",
      ellipsis: true,
    },
    {
      title: (
        <Space>
          <TagOutlined />
          Genre
        </Space>
      ),
      dataIndex: "genre",
      key: "genre",
      render: (genre) => (
        <Tag color={genreColors[genre] || "#108ee9"}>{genre}</Tag>
      ),
    },
    {
      title: (
        <Space>
          <CalendarOutlined />
          Year
        </Space>
      ),
      dataIndex: "publishedYear",
      key: "publishedYear",
      width: 100,
    },
    {
      title: (
        <Space>
          <InfoCircleOutlined />
          Status
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={status === "Available" ? "success" : "warning"}
          text={status}
        />
      ),
    },
    {
      title: (
        <Space>
          <StarOutlined />
          Rating
        </Space>
      ),
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (rating) => (
        <Space>
          <StarOutlined style={{ color: "#fadb14" }} />
          {rating || "N/A"}
        </Space>
      ),
    },
    {
      title: (
        <Space>
          <FileTextOutlined />
          Description
        </Space>
      ),
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (description) => (
        <Tooltip title={description}>
          <Text ellipsis style={{ maxWidth: 200 }}>
            {description || "No description"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Book">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Book"
            description="Are you sure you want to delete this book?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Delete Book">
              <Button danger size="small" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={books}
      rowKey="id"
      pagination={{
        current: currentPageNum,
        pageSize: pageSize,
        total: books.length,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} books`,
        pageSizeOptions: pageSizeOptions,
        onChange: onPageChange,
        onShowSizeChange: (current, size) => {
          onPageSizeChange(1, size);
        },
      }}
      scroll={{ x: 1000 }}
    />
  );
};

export default BookTable;
