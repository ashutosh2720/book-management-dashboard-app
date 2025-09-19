import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Button,
  Row,
  Col,
} from "antd";
import {
  BookOutlined,
  UserOutlined,
  TagOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  StarOutlined,
  FileTextOutlined,
  GlobalOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { genreColors } from "../../utils/constants";

const { Option } = Select;

const BookForm = ({
  isOpen,
  editingBook,
  form,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  return (
    <Modal
      title={
        <Space>
          <BookOutlined />
          {editingBook ? "Edit Book" : "Add New Book"}
        </Space>
      }
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label={
                <Space>
                  <BookOutlined />
                  Title
                </Space>
              }
              rules={[{ required: true, message: "Please enter book title" }]}
            >
              <Input placeholder="Enter book title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label={
                <Space>
                  <UserOutlined />
                  Author
                </Space>
              }
              rules={[{ required: true, message: "Please enter author name" }]}
            >
              <Input placeholder="Enter author name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="genre"
              label={
                <Space>
                  <TagOutlined />
                  Genre
                </Space>
              }
              rules={[{ required: true, message: "Please select a genre" }]}
            >
              <Select placeholder="Select genre">
                {Object.keys(genreColors).map((genre) => (
                  <Option key={genre} value={genre}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: genreColors[genre],
                        }}
                      />
                      {genre}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="publishedYear"
              label={
                <Space>
                  <CalendarOutlined />
                  Published Year
                </Space>
              }
              rules={[
                { required: true, message: "Please enter published year" },
              ]}
            >
              <InputNumber
                placeholder="Enter year"
                min={1000}
                max={new Date().getFullYear()}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label={
                <Space>
                  <InfoCircleOutlined />
                  Status
                </Space>
              }
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status">
                <Option value="Available">Available</Option>
                <Option value="Issued">Issued</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rating"
              label={
                <Space>
                  <StarOutlined />
                  Rating
                </Space>
              }
            >
              <InputNumber
                placeholder="Rating (0-5)"
                min={0}
                max={5}
                step={0.1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="pages"
              label={
                <Space>
                  <FileTextOutlined />
                  Pages
                </Space>
              }
            >
              <InputNumber
                placeholder="Number of pages"
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="language"
              label={
                <Space>
                  <GlobalOutlined />
                  Language
                </Space>
              }
            >
              <Input placeholder="Language" defaultValue="English" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label={
            <Space>
              <FileTextOutlined />
              Description
            </Space>
          }
        >
          <Input.TextArea
            rows={3}
            placeholder="Enter book description (optional)"
          />
        </Form.Item>

        <Form.Item
          name="cover"
          label={
            <Space>
              <FileTextOutlined />
              Cover Image URL
            </Space>
          }
        >
          <Input placeholder="Enter cover image URL (optional)" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={editingBook ? <EditOutlined /> : <PlusOutlined />}
            >
              {editingBook ? "Update Book" : "Add Book"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookForm;
