import React from "react";
import { Card, Skeleton, Space } from "antd";

const BookCardSkeleton = () => {
  return (
    <Card
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
          <Skeleton.Avatar 
            active
            shape="square" 
            size={120} 
            style={{ 
              width: "100%", 
              height: "100%",
              borderRadius: 0
            }} 
          />
        </div>
      }
      actions={[
        <Skeleton.Button active size="small" key="edit" style={{ width: "24px" }} />,
        <Skeleton.Button active size="small" key="delete" style={{ width: "24px" }} />,
        <Skeleton.Button active size="small" key="info" style={{ width: "24px" }} />,
      ]}
    >
      <Card.Meta
        title={
          <div>
            <Skeleton.Input 
              active 
              size="small" 
              style={{ width: "85%", height: "16px", marginBottom: 6 }} 
            />
            <Skeleton.Input 
              active 
              size="small" 
              style={{ width: "65%", height: "12px" }} 
            />
          </div>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton.Button active size="small" style={{ width: "60px", height: "22px", borderRadius: "12px" }} />
              <Skeleton.Button active size="small" style={{ width: "70px", height: "22px", borderRadius: "12px" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton.Input 
                active 
                size="small" 
                style={{ width: "50px", height: "14px" }} 
              />
              <Skeleton.Input 
                active 
                size="small" 
                style={{ width: "40px", height: "14px" }} 
              />
            </div>
          </Space>
        }
      />
    </Card>
  );
};

export default BookCardSkeleton;
