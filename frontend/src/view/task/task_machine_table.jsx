import React, { useState, useEffect } from "react";
import {
  Tag,
  Input,
  BackTop,
  Table,
  Button,
  Popconfirm,
  Typography,
  message,
} from "antd";
import useDebounce from "../../utils/useDebounce";
import moment from "moment";

import { searchTasks, getTasks, changeExecutingTasks } from "../../utils/api";

const { Text } = Typography;

const { Search } = Input;

/**
 *
 * @param {type:string} props
 */
const TaskMachineTable = ({ type, number }) => {
  const ENTER_KEY = 13;
  const WAIT_TIME = 500;
  const searchPlaceholder =
    "Please enter keywords here, e.g. Machine number、Production number、Structure ...";
  if (type === "fuzhao") {
  } else if (type === "jichu") {
  }

  // State for tasks (task list)
  const [realTasks, setRealTasks] = useState([]);
  // State for search keyword
  const [keyword, setKeyword] = useState("");
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(keyword, WAIT_TIME);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    getTasks(type, number).then((res) => {
      // console.log("TaskMachineTable -> res", res.data);
      setRealTasks(res.data);
    });
  }, [type, number]);

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm === "") {
        getTasks(type, number).then((res) => {
          setRealTasks(res.data);
        });
      } else {
        if (debouncedSearchTerm) {
          console.log("TaskList -> debouncedSearchTerm", debouncedSearchTerm);
          // Set isSearching state
          setIsSearching(true);
          // Fire off our API call
          searchTasks(type, debouncedSearchTerm).then((results) => {
            // console.log("TaskList -> results", results);
            // Set back to false since request finished
            setIsSearching(false);
            // Set results state
            setRealTasks(results.data);
          });
        } else {
          setRealTasks([]);
        }
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm, type, number]
  );

  const fetchSearchResults = async (value) => {
    if (value === "") {
      getTasks(type, number).then((res) => {
        setRealTasks(res.data);
      });
    } else {
      const resultTasks = await searchTasks(type, value);
      console.log("fetchSearchResults -> resultTasks", resultTasks);
      setRealTasks(resultTasks.data);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      fetchSearchResults(e);
    }
  };

  const columns = () => [
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      render: (value) => {
        return <Text>{moment(value).format("YYYY-MM-DD HH:mm:ss")}</Text>;
      },
      sorter: (a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Machine number",
      dataIndex: "machine_number",
      key: "machine_number",
      width: 80,
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
      width: 130,
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      key: "product_name",
      width: 150,
    },
    {
      title: "Specs",
      dataIndex: "specification",
      key: "specification",
      width: 90,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 90,
    },
    {
      title: "Structure",
      dataIndex: "conductor_struct",
      key: "conductor_struct",
      width: 120,
    },
    {
      title: "Next Prod number",
      dataIndex: "next_production_number",
      key: "next_production_number",
      width: 130,
    },
    { title: "Notes", dataIndex: "note", key: "note" },
    {
      title: "Planned Amount",
      dataIndex: "amount_planned",
      key: "amount_planned",
      width: 90,
    },
    {
      title: "Finished Amount",
      dataIndex: "amount_finished",
      key: "amount_finished",
      width: 90,
    },
    {
      title: "Operation",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: 95,
      render: (task) => (
        <Popconfirm
          okText={"Confirm"}
          onConfirm={() => {
            changeExecutingTasks(type, task._id, number);
            message.success("Operation succeeded, starting new task.");
            setTimeout(() => {
              window.location.reload(false);
            }, 500);
          }}
          cancelText={"Cancel"}
          title={() => (
            <Text>
              Please varify whether switch to and start the chosen task.
            </Text>
          )}
        >
          <Button>Start</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
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
      {realTasks.length > 0 ? (
        <Table
          dataSource={realTasks}
          columns={columns()}
          scroll={{ x: 1500, y: 800 }}
        />
      ) : (
        <div>No relavent results found</div>
      )}
      <BackTop />
    </>
  );
};

export default TaskMachineTable;
