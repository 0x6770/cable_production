import React, { useState, useEffect } from "react";
import {
  Typography,
  BackTop,
  Table,
  Button,
  Space,
  message,
  Popconfirm,
} from "antd";

import { deleteWorkerById } from "../../utils/api";

const { Title, Text } = Typography;

const WorkerTable = ({ type, workers }) => {
  let type_cn = "";
  if (type === "fuzhao") {
    type_cn = "Irradiation";
  } else if (type === "jichu") {
    type_cn = "Extrusion";
  }

  const [workerList, setWorkerList] = useState([]);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    setWorkerList(workers);
  }, [workers]);

  const columns = () => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (value) => <Text>{value}</Text>,
    },
    {
      title: "Operation",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: 120,
      render: (task) => (
        <Space>
          <Popconfirm
            okText={"Confirm"}
            onConfirm={() => {
              deleteWorkerById(type, task._id);
              message.success("Operation succeededed, deleting chosen worker.");
              setTimeout(() => {
                window.location.reload(false);
              }, 500);
            }}
            cancelText={"Cancel"}
            title={() => (
              <Text>Please confirm whether to delete the chosen worker.</Text>
            )}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={4}>{type_cn} Process Worker List</Title>
      <Table
        style={{ maxWidth: 90 + "vw" }}
        dataSource={workerList}
        pagination={{ pageSize: 20 }}
        columns={columns()}
        // scroll={{ x: 1200 }}
      />
      <BackTop />
    </>
  );
};

export default WorkerTable;
