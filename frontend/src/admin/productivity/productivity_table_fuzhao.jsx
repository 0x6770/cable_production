import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Typography,
  BackTop,
  Button,
  Popconfirm,
  message,
} from "antd";
import moment from "moment";

import useDebounce from "../../utils/useDebounce";

import {
  searchProductivity,
  deleteProductivityById,
  getWorkers,
} from "../../utils/api";

import {
  EditableCell,
  EditableCellDate,
  EditableCellTime,
  EditableCellName,
  handleUpdateProductivity,
} from "../../components/editableTableCell.jsx";

const { Search } = Input;

const { Title, Text } = Typography;

const ProductivityTable = ({ productivity }) => {
  const type = "fuzhao";
  const ENTER_KEY = 13;
  const WAIT_TIME = 500;
  const searchPlaceholder =
    "Please enter keywords here, e.g. Machine number、Production number、Structure ...";

  const [workers, setWorkers] = useState([]);

  // State for tasks (task list)
  const [productivityList, setProductivityList] = useState([]);
  // State for search keyword
  const [keyword, setKeyword] = useState("");
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(keyword, WAIT_TIME);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    setProductivityList(productivity);
  }, [productivity]);

  useEffect(() => {
    // Update the document title using the browser API
    getWorkers("fuzhao").then((res) => {
      if (res.data.workers.length === undefined) {
        setWorkers([]);
      } else {
        setWorkers(res.data.workers);
      }
    });
  }, []);

  useEffect(() => {
    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm === "") {
      setProductivityList(productivity);
    } else {
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        searchProductivity(type, debouncedSearchTerm).then((results) => {
          // Set back to false since request finished
          setIsSearching(false);
          // Set results state
          setProductivityList(results.data);
        });
      } else {
        setProductivityList([]);
      }
    }
  }, [debouncedSearchTerm, type, productivity]);

  const fetchSearchResults = async (value) => {
    if (value === "") {
      setProductivityList(productivity);
    } else {
      const newTasks = await searchProductivity(type, value);
      setProductivityList(newTasks.data);
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
      width: 150,
      render: (value) => {
        return <Text>{moment(value).format("MM月DD日 HH:mm")}</Text>;
      },
      sorter: (a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Worker",
      dataIndex: "worker",
      key: "worker",
      width: 110,
      render: (value, task) => (
        <EditableCellName
          type={type}
          id={task._id}
          value={value}
          workers={workers}
          handleFinish={handleUpdateProductivity}
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 130,
      render: (value, task) => (
        <EditableCellDate
          type={type}
          id={task._id}
          value={value}
          handleFinish={handleUpdateProductivity}
        />
      ),
      sorter: (a, b) => {
        return new Date(a.date) - new Date(b.date);
      },
    },
    {
      title: "Shift",
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (value, task) => (
        <EditableCellTime
          type={type}
          id={task._id}
          value={value}
          handleFinish={handleUpdateProductivity}
        />
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      width: 130,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"client"}
          handleFinish={handleUpdateProductivity}
        />
      ),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 130,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"model"}
          handleFinish={handleUpdateProductivity}
        />
      ),
    },
    {
      title: "Specs",
      dataIndex: "specification",
      key: "specification",
      width: 130,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"specification"}
          handleFinish={handleUpdateProductivity}
        />
      ),
    },
    {
      title: "Output",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (value, task) => (
        <EditableCell
          type={type}
          id={task._id}
          value={value}
          field={"amount"}
          handleFinish={handleUpdateProductivity}
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
          handleFinish={handleUpdateProductivity}
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
            deleteProductivityById(type, task._id);
            message.success("Operation succeeded, deleting the chosen output.");
            setTimeout(() => {
              window.location.reload(false);
            }, 500);
          }}
          cancelText={"Cancel"}
          title={() => (
            <Text>Please confirm whether to delete the chosen output.</Text>
          )}
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Title level={4}>Irradiation Process Output Statistics</Title>
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
        dataSource={productivityList}
        pagination={{ pageSize: 20 }}
        columns={columns}
        scroll={{ x: 1100, y: 220 }}
      />
      <BackTop />
    </>
  );
};

export default ProductivityTable;
