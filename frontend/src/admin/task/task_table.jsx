import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Input,
  Typography,
  BackTop,
  Button,
  Popconfirm,
  message,
} from "antd";
import moment from "moment";

import useDebounce from "../../utils/useDebounce";

import { deleteTaskById, searchTasks } from "../../utils/api";

import {
  EditableCell,
  EditableCellMachine,
  handleUpdateTask,
} from "../../components/editableTableCell.jsx";

const { Search } = Input;

const { Title, Text } = Typography;

const TaskTable = ({ type, tasks }) => {
  const ENTER_KEY = 13;
  const WAIT_TIME = 500;
  const searchPlaceholder =
    "Please enter keywords here, e.g. Machine number、Production number、Structure ...";

  // State for tasks (task list)
  const [tasksList, setTaskList] = useState([]);
  // State for search keyword
  const [keyword, setKeyword] = useState("");
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(keyword, WAIT_TIME);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm === "") {
      setTaskList(tasks);
    } else {
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        searchTasks(type, debouncedSearchTerm).then((results) => {
          // Set back to false since request finished
          setIsSearching(false);
          // Set results state
          setTaskList(results.data);
        });
      } else {
        setTaskList([]);
      }
    }
  }, [debouncedSearchTerm, type, tasks]);

  const fetchSearchResults = async (value) => {
    if (value === "") {
      setTaskList(tasks);
    } else {
      const newTasks = await searchTasks(type, value);
      setTaskList(newTasks.data);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      fetchSearchResults(e);
    }
  };

  const columns = [
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      render: (value) => {
        return <Text>{moment(value).format("DD/MM HH:mm")}</Text>;
      },
      sorter: (a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      },
    },
    {
      title: "Machine number",
      dataIndex: "machine_number",
      key: "machine_number",
      width: 100,
      render: (value, task) => (
        <EditableCellMachine
          type={type}
          id={task._id}
          value={value}
          handleFinish={handleUpdateTask}
        />
      ),
      sorter: (a, b) => {
        return a.machine_number - b.machine_number;
      },
    },
    {
      title: "Completion",
      key: "finished",
      dataIndex: "finished",
      width: 130,
      render: (finished, task) => {
        const color = finished ? "green" : "orange";
        const text = finished ? "finished" : "pending";
        return (
          <Tag color={color} key={color}>
            {text}
          </Tag>
        );
      },
      filters: [
        {
          text: "finished",
          value: true,
        },
        {
          text: "pending",
          value: false,
        },
      ],
      onFilter: (value, task) => task.finished === value,
    },
    {
      title: "Production number",
      dataIndex: "production_number",
      key: "production_number",
      width: 110,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"production_number"}
          handleFinish={handleUpdateTask}
        />
      ),
      sorter: (a, b) => {
        return parseInt(a.production_number) - parseInt(b.production_number);
      },
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      key: "product_name",
      width: 150,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"product_name"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Specs",
      dataIndex: "specification",
      key: "specification",
      width: 100,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"specification"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 100,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"color"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Structure",
      dataIndex: "conductor_struct",
      key: "conductor_struct",
      width: 120,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"conductor_struct"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Next Prod number",
      dataIndex: "next_production_number",
      key: "next_production_number",
      width: 100,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"next_production_number"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
      width: 200,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"note"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Planned Amount",
      dataIndex: "amount_planned",
      key: "amount_planned",
      width: 105,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"amount_planned"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Finished Amount",
      dataIndex: "amount_finished",
      key: "amount_finished",
      width: 105,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"amount_finished"}
          handleFinish={handleUpdateTask}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: 90,
      render: (task) => (
        <Popconfirm
          okText={"Confirm"}
          onConfirm={() => {
            deleteTaskById(type, task._id);
            message.success("Operation succeeded, deleting the chosen task.");
            setTimeout(() => {
              window.location.reload(false);
            }, 500);
          }}
          cancelText={"Cancel"}
          title={() => (
            <Text>Please confirm whether to delete the chosen task</Text>
          )}
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Title level={4}>
        {type === "jichu"
          ? "Extrusion"
          : "" + type === "fuzhao"
          ? "Irradiation"
          : ""}
        Production Task Table
      </Title>
      <Search
        placeholder={searchPlaceholder}
        enterButton="Search"
        size="large"
        onSearch={(value) => fetchSearchResults(value)}
        onChange={(e) => {
          setKeyword(e.target.value.trim());
          console.log("e.target.value.trim()", e.target.value.trim());
        }}
        onKeyDown={handleKeyDown}
        loading={isSearching}
      />
      <Table
        style={{ maxWidth: 90 + "vw" }}
        dataSource={tasksList}
        pagination={{ pageSize: 20 }}
        columns={columns}
        scroll={{ x: 1100, y: 220 }}
      />
      <BackTop />
    </>
  );
};

export default TaskTable;
