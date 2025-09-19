import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  BookOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";

const BookStats = ({ stats }) => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 12, md: 16, lg: 16 }, // horizontal spacing
        { xs: 8, sm: 12, md: 16, lg: 16 }, // vertical spacing
      ]}
      style={{ marginBottom: "24px" }}
    >
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Total Books"
            value={stats.total}
            prefix={<BookOutlined />}
            valueStyle={{ color: "#1890ff" }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Available"
            value={stats.available}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Issued"
            value={stats.issued}
            prefix={<ExclamationCircleOutlined />}
            valueStyle={{ color: "#fa8c16" }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Genres"
            value={stats.genres}
            prefix={<TagOutlined />}
            valueStyle={{ color: "#722ed1" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default BookStats;
