import React, { useState, useEffect } from "react";
import { Table, Typography, BackTop, DatePicker, Space, Button } from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import moment from "moment";

import { searchProductivity } from "../../utils/api";

const { Title } = Typography;

const ProductivityTable = ({ type, productivity }) => {
  const s = (num) => {
    return num < 10 ? "0" + num : num;
  };
  const [dateString, setDateString] = useState(() => {
    const now = new window.Date();
    return (
      s(now.getFullYear()) +
      "_" +
      s(now.getMonth() + 1) +
      "_" +
      s(now.getDate() - 1)
    );
  });

  // const isMobile = navigator.userAgent.match(
  //   /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  // );

  const [productivityList, setProductivityList] = useState([]);

  const fetchSearchResults = async (value) => {
    if (value === "") {
      setProductivityList(productivity);
    } else {
      const newTasks = await searchProductivity(type, value);
      setProductivityList(newTasks.data);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new window.Date();
      setDateString(
        s(now.getFullYear()) +
          "_" +
          s(now.getMonth() + 1) +
          "_" +
          s(now.getDate() - 1)
      );
    }, 300000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchSearchResults(dateString);
    }, 300000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchSearchResults(dateString);
  }, [dateString]);

  const columns = () => [
    {
      title: "Worker",
      dataIndex: "worker",
      key: "worker",
      width: 140,
      fixed: "left",
      render: (value) => {
        return (
          <Title level={4} style={{ margin: 0 }}>
            {JSON.parse(value).name}
          </Title>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {moment(value).format("MM月DD日")}
        </Title>
      ),
    },
    {
      title: "Shift",
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      width: 180,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 180,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
    {
      title: "Specs",
      dataIndex: "specification",
      key: "specification",
      width: 180,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
    {
      title: "Output",
      dataIndex: "amount",
      key: "amount",
      width: 140,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
      width: 250,
      render: (value) => (
        <Title level={4} style={{ margin: 0 }}>
          {value}
        </Title>
      ),
    },
  ];

  return (
    <Space direction="vertical">
      <Space>
        <DatePicker
          size={"large"}
          locale={locale}
          placeholder={dateString}
          format={"YYYY/MM/DD"}
          onChange={(date, dateString) => {
            fetchSearchResults(dateString.replace(/\//g, "_"));
          }}
        />
        <Button
          size="large"
          type="primary"
          onClick={() => {
            fetchSearchResults("");
          }}
        >
          View all
        </Button>
      </Space>

      <Table
        className="view-table"
        style={{ maxWidth: 90 + "vw" }}
        dataSource={productivityList}
        columns={columns()}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 1500, y: 650 }}
      />
      <BackTop />
    </Space>
  );
};

export default ProductivityTable;
