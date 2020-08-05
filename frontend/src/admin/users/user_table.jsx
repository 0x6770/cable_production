import React, { useState, useEffect } from "react";
import {
  Tag,
  Typography,
  BackTop,
  Table,
  Button,
  Space,
  message,
  Popconfirm,
  Select,
} from "antd";

import { deleteUserById, updateUserById } from "../../utils/api";

const { Title, Text } = Typography;
const { Option } = Select;

const AuthorityControl = ({ value, user }) => {
  const [edit, setEdit] = useState(false);
  const [optionState, setOptionState] = useState(value);
  const options = [
    { name: "basic", key: "basic" },
    { name: "irradiation admin", key: "fuzhao_admin" },
    { name: "extrusion admin", key: "jichu_admin" },
  ];
  const optionKeys = ["basic", "fuzhao_admin", "jichu_admin"];
  const handleChange = (value) => {
    setOptionState(value);
  };
  return (
    <>
      {edit ? (
        <>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please allocate permission"
            defaultValue={value}
            onChange={handleChange}
          >
            {options.map((option) => (
              <Option key={option.key}>{option.name}</Option>
            ))}
          </Select>
          <Space>
            <Button type="link" onClick={() => setEdit(!edit)}>
              Cancel
            </Button>
            <Popconfirm
              okText={"Confirm"}
              onConfirm={() => {
                updateUserById(user._id, optionState)
                  .then((res) => {
                    if (res.data === "success") {
                      setEdit(!edit);
                      message.success("Operation succeeded");
                      setTimeout(() => {
                        window.location.reload(false);
                      }, 500);
                    }
                  })
                  .catch((err) => {
                    message.error(err);
                  });
              }}
              cancelText={"Cancel"}
              title={() => (
                <Text>Please confirm whether to save the change</Text>
              )}
            >
              <Button type="link">Finish</Button>
            </Popconfirm>
          </Space>
        </>
      ) : (
        <>
          <Space>
            {value.map((authority) => {
              return (
                <Tag key={user._id + authority}>
                  {options[optionKeys.indexOf(authority)].name}
                </Tag>
              );
            })}
          </Space>
          <Button type="link" onClick={() => setEdit(!edit)}>
            edit
          </Button>
        </>
      )}
    </>
  );
};

const columns = () => {
  return [
    {
      title: "User name",
      dataIndex: "username",
      key: "username",
      render: (value, user) => (
        <Space>
          <Text>{value}</Text>
          {user.admin ? <Tag color="green">Admin</Tag> : <></>}
        </Space>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (value) => <Text>{value}</Text>,
    },
    {
      title: "Permission",
      dataIndex: "authority",
      key: "authority",
      render: (value, user) => <AuthorityControl value={value} user={user} />,
    },
    {
      title: "Operation",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: 120,
      render: (user) => (
        <Space>
          <Popconfirm
            okText={"Confirm"}
            onConfirm={() => {
              deleteUserById(user._id);
              message.success("Operation succeeded, deleting the chosen user.");
              setTimeout(() => {
                window.location.reload(false);
              }, 500);
            }}
            cancelText={"Cancel"}
            title={() => (
              <Text>Please confirm whether to delete the chosen user.</Text>
            )}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

const UserTable = ({ users }) => {
  const [userList, setUserList] = useState([]);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    setUserList(users);
  }, [users]);

  return (
    <>
      <Title level={4}>User List</Title>
      <Table
        style={{ maxWidth: 90 + "vw" }}
        dataSource={userList}
        pagination={true}
        columns={columns()}
        scroll={{ x: 1200 }}
      />
      <BackTop />
    </>
  );
};

export default UserTable;
