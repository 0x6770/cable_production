import React, { useState } from "react";
import {
  Input,
  InputNumber,
  Typography,
  Button,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";

import {
  updateProductivity,
  updateTask,
  updateFinishedAmount,
} from "../utils/api";

const { Option } = Select;
const { Text } = Typography;

export const handleUpdateProductivity = (state, type, id, field) => {
  let newData = {};
  newData[field] = state;
  updateProductivity(type, id, newData)
    .then((res) => {
      if (res.data.message === "success") {
        message.success("修改成功");
        window.location.reload(false);
      }
    })
    .catch((err) => message.error(err));
};

export const handleUpdateTask = (state, type, id, field) => {
  let newData = {};
  newData[field] = state;
  updateTask(type, id, newData)
    .then((res) => {
      if (res.data.message === "success") {
        message.success("修改成功");
        window.location.reload(false);
      }
    })
    .catch((err) => message.error(err));
};

export const handleUpdateTaskAmount = (state, type, id, field) => {
  let newData = {};
  newData[field] = state;
  updateFinishedAmount(type, id, newData)
    .then((res) => {
      if (res.data.message === "success") {
        message.success("修改成功");
        window.location.reload(false);
      }
    })
    .catch((err) => message.error(err));
};

export const EditableCell = ({
  type,
  id,
  value,
  field,
  handleFinish,
  style,
}) => {
  // console.log("EditableCell -> id", id);
  let state;
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <Input
          defaultValue={value}
          onChange={(e) => {
            const { value } = e.target;
            state = value;
          }}
        />
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : value ? (
    <Text
      style={style}
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value}
    </Text>
  ) : (
    <div
      style={{
        backgroundColor: "#999",
        height: 14 + "px",
        width: 40 + "px",
        margin: "auto",
        borderRadius: 4 + "px",
      }}
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    ></div>
  );
};

export const EditableCellNumber = ({
  type,
  id,
  value,
  field,
  handleFinish,
}) => {
  let state;
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <InputNumber
          defaultValue={value}
          onChange={(value) => {
            state = value;
          }}
        />
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value}
    </Text>
  );
};

export const EditableCellName = ({
  type,
  id,
  value,
  workers,
  handleFinish,
}) => {
  let state;
  const field = "worker";
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <Select
          defaultValue={JSON.parse(value).name}
          placeholder="请Choose..."
          onChange={(value) => {
            state = value;
          }}
        >
          {workers.map((worker) => {
            const data = { id: worker._id, name: worker.name };
            return <Option value={JSON.stringify(data)}>{worker.name}</Option>;
          })}
        </Select>
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {JSON.parse(value).name}
    </Text>
  );
};

export const EditableCellDate = ({ type, id, value, handleFinish }) => {
  let state;
  const field = "date";
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <DatePicker
          placeholder={"请ChooseDate"}
          format={"YYYY/MM/DD"}
          onChange={(date, dateString) => {
            state = dateString;
          }}
        />
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value}
    </Text>
  );
};

export const EditableCellTime = ({ type, id, value, handleFinish }) => {
  let state;
  const field = "time";
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <Select
          defaultValue={value}
          placeholder="请Choose..."
          onChange={(value) => {
            state = value;
          }}
        >
          <Option value="白">白</Option>
          <Option value="晚">晚</Option>
        </Select>
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value}
    </Text>
  );
};

export const EditableCellProcess = ({ type, id, value, handleFinish }) => {
  let state;
  const field = "process";
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <Select
          defaultValue={value}
          placeholder="请Choose..."
          onChange={(value) => {
            state = value;
          }}
        >
          <Option value="jueyuan">Isolation</Option>
          <Option value="hutao">Sheathing</Option>
        </Select>
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value === "hutao" ? "Sheathing" : ""}
      {value === "jueyuan" ? "Isolation" : ""}
    </Text>
  );
};

export const EditableCellMachine = ({ type, id, value, handleFinish }) => {
  let state;
  const field = "machine_number";
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Form onFinish={() => handleFinish(state, type, id, field)}>
      <Form.Item rules={[{ required: true }]}>
        <Select
          defaultValue={value}
          placeholder="请Choose..."
          onChange={(value) => {
            state = value;
          }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5" hidden={type === "fuzhao"}>
            5
          </Option>
          <Option value="6" hidden={type === "fuzhao"}>
            6
          </Option>
        </Select>
      </Form.Item>
      <Button type="link" size="small" htmlType="submit">
        Confirm
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  ) : (
    <Text
      className="editableCell"
      onClick={() => {
        setEdit(true);
      }}
    >
      {value}
    </Text>
  );
};
