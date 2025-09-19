import { useState } from "react";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md; // Hide sidebar on screens smaller than md (768px)

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileDrawerVisible,
    setMobileDrawerVisible,
    isMobile,
    screens,
  };
};
