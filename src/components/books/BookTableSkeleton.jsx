import React from "react";
import { Table, Skeleton, Space } from "antd";
import {
  BookOutlined,
  UserOutlined,
  TagOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  StarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { pageSizeOptions } from "../../utils/constants";

const BookTableSkeleton = ({
  currentPageNum,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  // Create skeleton data
  const skeletonData = Array.from({ length: pageSize || 10 }, (_, index) => ({
    id: `skeleton-${index}`,
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    status: '',
    rating: '',
    description: '',
  }));

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
      render: () => (
        <Space>
          <Skeleton.Avatar size="small" />
          <Skeleton.Input active size="small" style={{ width: "120px" }} />
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
      render: () => (
        <Skeleton.Input active size="small" style={{ width: "100px" }} />
      ),
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
      render: () => (
        <Skeleton.Button 
          active 
          size="small" 
          style={{ width: "70px", height: "22px", borderRadius: "12px" }} 
        />
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
      render: () => (
        <Skeleton.Input active size="small" style={{ width: "50px" }} />
      ),
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
      render: () => (
        <Skeleton.Button 
          active 
          size="small" 
          style={{ width: "80px", height: "22px", borderRadius: "12px" }} 
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
      render: () => (
        <Space>
          <Skeleton.Avatar size="small" shape="square" style={{ width: "14px", height: "14px" }} />
          <Skeleton.Input active size="small" style={{ width: "30px" }} />
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
      render: () => (
        <Skeleton.Input active size="small" style={{ width: "150px" }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: () => (
        <Space>
          <Skeleton.Button active size="small" style={{ width: "32px", height: "24px" }} />
          <Skeleton.Button active size="small" style={{ width: "32px", height: "24px" }} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={skeletonData}
      rowKey="id"
      pagination={{
        current: currentPageNum,
        pageSize: pageSize,
        total: 100, // Placeholder total
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

export default BookTableSkeleton;
