import React from "react";
import { Layout, Button, Space, Tooltip, Switch, Typography } from "antd";
import {
  MenuOutlined,
  AppstoreOutlined,
  TableOutlined,
  BulbOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getPageTitle } from "../../utils/helpers";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = ({
  isDarkMode,
  setIsDarkMode,
  isMobile,
  setMobileDrawerVisible,
  currentPage,
  viewMode,
  setViewMode,
  onAddBook,
}) => {
  return (
    <AntHeader
      style={{
        background: isDarkMode ? "#141414" : "#fff",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div className="w-full flex justify-between">
        <div style={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerVisible(true)}
              style={{ marginRight: 16 }}
            />
          )}
          <Title level={3} style={{ margin: 0 }}>
            {getPageTitle(currentPage)}
          </Title>
        </div>
        <Space>
          <Tooltip
            title={
              viewMode === "table"
                ? "Switch to Card View"
                : "Switch to Table View"
            }
          >
            <Button
              icon={
                viewMode === "table" ? (
                  <AppstoreOutlined />
                ) : (
                  <TableOutlined />
                )
              }
              onClick={() =>
                setViewMode(viewMode === "table" ? "card" : "table")
              }
            />
          </Tooltip>
          <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddBook}
            size="large"
          >
            Add Book
          </Button>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
