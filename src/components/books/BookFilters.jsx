import React from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Tooltip,
  Tag,
  Badge,
} from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { sortOptions, genreColors } from "../../utils/constants";

const { Search } = Input;
const { Option } = Select;

const BookFilters = ({
  books,
  searchText,
  setSearchText,
  sortBy,
  sortOrder,
  onSortChange,
  genreFilter,
  setGenreFilter,
  statusFilter,
  setStatusFilter,
  yearFilter,
  setYearFilter,
  dateFilter,
  setDateFilter,
  onClearAllFilters,
  onRefresh,
  isLoading,
}) => {
  return (
    <Card style={{ marginBottom: "24px" }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8} lg={5}>
          <Search
            placeholder="Search books, authors, genres..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Sort by"
            value={`${sortBy}-${sortOrder}`}
            onChange={onSortChange}
            style={{ width: "100%" }}
            suffixIcon={<SortAscendingOutlined />}
          >
            {sortOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6} lg={3}>
          <Select
            placeholder="Genre"
            value={genreFilter}
            onChange={setGenreFilter}
            style={{ width: "100%" }}
            allowClear
          >
            {[...new Set(books.map((book) => book.genre))].map((genre) => (
              <Option key={genre} value={genre}>
                <Tag
                  color={genreColors[genre] || "#108ee9"}
                  style={{ margin: 0 }}
                >
                  {genre}
                </Tag>
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6} lg={3}>
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: "100%" }}
            allowClear
          >
            <Option value="Available">
              <Badge status="success" text="Available" />
            </Option>
            <Option value="Issued">
              <Badge status="warning" text="Issued" />
            </Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6} lg={3}>
          <Select
            placeholder="Year"
            value={yearFilter}
            onChange={setYearFilter}
            style={{ width: "100%" }}
            allowClear
          >
            {[...new Set(books.map((book) => book.publishedYear))]
              .sort((a, b) => b - a)
              .map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6} lg={3}>
          <DatePicker
            placeholder="Created Date"
            value={dateFilter ? dayjs(dateFilter) : null}
            onChange={(date) =>
              setDateFilter(date ? date.toISOString() : null)
            }
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={12} md={6} lg={3}>
          <Space wrap>
            <Tooltip title="Clear All Filters">
              <Button icon={<ReloadOutlined />} onClick={onClearAllFilters} />
            </Tooltip>
            <Tooltip title="Refresh Data">
              <Button
                icon={<ReloadOutlined />}
                onClick={onRefresh}
                loading={isLoading}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BookFilters;
