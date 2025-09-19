import React from "react";
import { Card, Space, Tag, Tooltip, Popconfirm, Typography } from "antd";
import {
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { genreColors } from "../../utils/constants";

const { Text } = Typography;

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <Card
      key={book.id}
      hoverable
      style={{ height: "100%" }}
      cover={
        <div
          style={{
            height: 200,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <BookOutlined style={{ fontSize: 48, color: "#ccc" }} />
          )}
        </div>
      }
      actions={[
        <Tooltip
        key="info"
        title={book.description || "No description available"}
      >
        <InfoCircleOutlined />
      </Tooltip>,
      <Tooltip title="Edit Book" key="edit">
      <EditOutlined onClick={() => onEdit(book)} />
      </Tooltip>,
        <Popconfirm
          key="delete"
          title="Delete this book?"
          onConfirm={() => onDelete(book.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Book">
            <DeleteOutlined style={{ color: "#ff4d4f" }} />
          </Tooltip>
        </Popconfirm>,
      ]}
    >
      <Card.Meta
        title={
          <div>
            <Text strong ellipsis style={{ display: "block", marginBottom: 4 }}>
              {book.title}
            </Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              by {book.author}
            </Text>
          </div>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tag style={{borderRadius: "4px"}} color={genreColors[book.genre] || "#108ee9"}>
                {book.genre}
              </Tag>
              <Tag
                color={book.status === "Available" ? "green" : "red"}
                style={{ borderRadius: "4px", fontWeight: "500" }}
              >
                {book.status}
              </Tag>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text type="secondary" style={{ fontSize: "13px" }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {book.publishedYear}
              </Text>
              {book.rating && (
                <div>
                  <StarOutlined style={{ color: "#fadb14" }} />
                  <Text style={{ marginLeft: 4 }}>{book.rating}</Text>
                </div>
              )}
            </div>
          </Space>
        }
      />
    </Card>
  );
};

export default BookCard;
