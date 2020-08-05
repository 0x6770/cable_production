import React, { useState } from "react";
import {
  Tag,
  Typography,
  Table,
  Button,
  Space,
  Modal,
  message,
  Popconfirm,
} from "antd";
import { useEffect } from "react";

import TaskMachineTable from "./task_machine_table.jsx";
import { updateFinishedState } from "../../utils/api.js";

import {
  EditableCell,
  handleUpdateTaskAmount,
} from "../../components/editableTableCell";

const { Title, Text } = Typography;

const ButtonGroup = ({ type, type_cn, task }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Space>
        {task._id === undefined || task.finished === true ? (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Choose
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => {
              setVisible(true);
            }}
          >
            Switch
          </Button>
        )}
        {task.finished === true ? (
          <Popconfirm
            okText={"Confirm"}
            onConfirm={() => {
              updateFinishedState(type, task._id, false);
              message.success(
                "Operation succeeded, starting to restore the chosen task."
              );
              setTimeout(() => {
                window.location.reload(false);
              }, 500);
            }}
            cancelText={"Cancel"}
            title={() => (
              <Text>Please confirm whether to restore the chosen task.</Text>
            )}
          >
            <Button size="small">Restore</Button>
          </Popconfirm>
        ) : (
          <></>
        )}
        {task.amount_finished >= task.amount_planned ? (
          <Popconfirm
            okText={"Confirm"}
            onConfirm={() => {
              updateFinishedState(type, task._id, true);
              message.success(
                "Operation succeeded, starting to end the chosen task."
              );
              setTimeout(() => {
                window.location.reload(false);
              }, 500);
            }}
            cancelText={"Cancel"}
            title={() => (
              <Text>Please confirm whether to end the chosen task.</Text>
            )}
          >
            <Button
              size="small"
              hidden={task._id === undefined || task.finished === true}
            >
              End
            </Button>
          </Popconfirm>
        ) : (
          <Button
            size="small"
            hidden={task._id === undefined || task.finished === true}
            onClick={() => {
              message.error(
                "The chosen task has not reached planned amount therefore can not be ended. If you want to switch task, please click the 'Switch' button."
              );
            }}
          >
            End
          </Button>
        )}
      </Space>
      <Modal
        title={"All " + type_cn + " production tasks"}
        visible={visible}
        width="90%"
        footer={null}
        maskAnimation={false}
        transitionName={false}
        // cancelText={"Cancel"}
        // confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <TaskMachineTable type={type} number={task.Executing_machine_number} />
      </Modal>
    </>
  );
};

const TaskTable = ({ type, tasks }) => {
  const [realTasks, setRealTasks] = useState([]);
  useEffect(() => {
    setRealTasks(tasks);
  }, [tasks]);

  let type_cn = "";
  if (type === "fuzhao") {
    type_cn = "Irridiation";
  } else if (type === "jichu") {
    type_cn = "Extrusion";
  }

  const columns = () => {
    const hightlight = "";
    // const hightlight = "#52c41a";
    const normal = "";
    return [
      {
        title: "Machine number",
        dataIndex: "Executing_machine_number",
        key: "Executing_machine_number",
        width: 120,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Space direction="horizontal">
              <Title level={3} style={{ margin: 0, color: color }}>
                {value}
              </Title>
              {task.finished ? <Tag color={"green"}>finished</Tag> : <></>}
            </Space>
          );
        },
      },
      {
        title: "Production number",
        dataIndex: "production_number",
        key: "production_number",
        width: 175,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Product name",
        dataIndex: "product_name",
        key: "product_name",
        width: 220,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Specs",
        dataIndex: "specification",
        key: "specification",
        width: 120,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        hidden: true,
        title: "Color",
        dataIndex: "color",
        key: "color",
        width: 100,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Structure",
        dataIndex: "conductor_struct",
        key: "conductor_struct",
        width: 145,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Next Prod number",
        dataIndex: "next_production_number",
        key: "next_production_number",
        width: 175,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Notes",
        dataIndex: "note",
        key: "note",
        width: 320,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Planned Amount",
        dataIndex: "amount_planned",
        key: "amount_planned",
        width: 135,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <Title level={3} style={{ margin: 0, color: color }}>
              {value}
            </Title>
          );
        },
      },
      {
        title: "Finished Amount",
        dataIndex: "amount_finished",
        key: "amount_finished",
        width: 160,
        render: (value, task) => {
          const color = task.finished ? hightlight : normal;
          return (
            <EditableCell
              type={type}
              id={task._id}
              value={value}
              field={"amount_finished"}
              handleFinish={handleUpdateTaskAmount}
              style={{ color: "blue" }}
            />
          );
        },
      },
      {
        title: "Operation",
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: 130,
        render: (task) => (
          <ButtonGroup type={type} task={task} type_cn={type_cn} />
        ),
      },
    ];
  };

  return (
    <Table
      className="view-table"
      dataSource={realTasks}
      pagination={false}
      columns={columns()}
      scroll={{ x: 1500 }}
      style={{ marginBottom: 10 + "px" }}
    />
  );
};

export default TaskTable;
