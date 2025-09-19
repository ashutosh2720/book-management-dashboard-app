import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Header from "./Header";

const { Content } = Layout;

const AppLayout = ({
  isDarkMode,
  setIsDarkMode,
  isMobile,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileDrawerVisible,
  setMobileDrawerVisible,
  currentPage,
  onPageChange,
  viewMode,
  setViewMode,
  onAddBook,
  children,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileDrawerVisible={mobileDrawerVisible}
        setMobileDrawerVisible={setMobileDrawerVisible}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <Layout
        style={{
          marginLeft: !isMobile ? (sidebarCollapsed ? 80 : 250) : 0,
        }}
      >
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isMobile={isMobile}
          setMobileDrawerVisible={setMobileDrawerVisible}
          currentPage={currentPage}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onAddBook={onAddBook}
        />

        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
