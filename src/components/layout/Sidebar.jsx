import React from "react";
import { Layout, Menu, Typography, Drawer } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { menuItemsData } from "../../utils/constants";

const { Sider } = Layout;
const { Title } = Typography;

// Convert iconType to actual icon component
const getIcon = (iconType) => {
  switch (iconType) {
    case "home":
      return <HomeOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    case "exclamation":
      return <ExclamationCircleOutlined />;
    default:
      return <HomeOutlined />;
  }
};

const SidebarContent = ({ 
  isDarkMode, 
  sidebarCollapsed, 
  isMobile, 
  currentPage, 
  onPageChange 
}) => (
  <div>
    <div
      style={{
        padding: "22px",
        textAlign: "center",
        borderBottom: "1px solid #f0f0f0",
        background: isDarkMode ? "#141414" : "#fff",
      }}
    >
      <Title
        level={4}
        style={{ margin: 0, color: isDarkMode ? "#fff" : "#000" }}
      >
        <BookOutlined style={{ marginRight: 8 }} />
        {!sidebarCollapsed && !isMobile && "Book Manager"}
      </Title>
    </div>
    <Menu
      mode="inline"
      selectedKeys={[currentPage]}
      style={{ borderRight: 0, background: "transparent" }}
      items={menuItemsData.map(item => ({
        key: item.key,
        icon: getIcon(item.iconType),
        label: item.label,
      }))}
      onClick={({ key }) => onPageChange(key)}
    />
  </div>
);

const Sidebar = ({
  isDarkMode,
  isMobile,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileDrawerVisible,
  setMobileDrawerVisible,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (key) => {
    onPageChange(key);
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          theme={isDarkMode ? "dark" : "light"}
          collapsible
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
          width={250}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <SidebarContent
            isDarkMode={isDarkMode}
            sidebarCollapsed={sidebarCollapsed}
            isMobile={isMobile}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        width={250}
        styles={{
          body: { padding: 0 },
          header: { display: isMobile ? "block" : "none" },
        }}
      >
        <SidebarContent
          isDarkMode={isDarkMode}
          sidebarCollapsed={false}
          isMobile={isMobile}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
