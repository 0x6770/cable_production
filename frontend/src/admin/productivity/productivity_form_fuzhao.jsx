import React, { useState, useEffect } from "react";

import {
  Card,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Select,
  message,
} from "antd";

import moment from "moment";

import { insertProductivity, getWorkers } from "../../utils/api";

const { Option } = Select;
const { TextArea } = Input;

const TaskForm = ({ hidden }) => {
  const handleFormShow = () => {
    message.success("Operation succeeded, created new task.");
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  const initialFormData = {
    date: moment(new Date(), "YYYY/MM/DD"),
    workerID: "",
    time: "",
    client: "",
    model: "",
    specification: "",
    amount: 0,
    note: "",
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [workers, setWorkers] = useState([]);

  const handleChange = (value, name) => {
    console.log("handleChange -> value", value);
    const processedValue = typeof value === String ? value.trim() : value;
    setFormData({
      ...formData,

      // Trimming any whitespace
      [name]: processedValue,
    });
  };

  const handleSubmit = (e) => {
    // ... submit to API or something
    insertProductivity("fuzhao", formData);
    handleFormShow();
  };

  useEffect(() => {
    // Update the document title using the browser API
    getWorkers("fuzhao").then((res) => {
      console.log("res.data.workers", res.data.workers);
      if (res.data.workers.length === undefined) {
        setWorkers([]);
      } else {
        setWorkers(res.data.workers);
      }
    });
  }, []);

  return (
    <Card
      hidden={hidden}
      title={"Add new Irradiation output"}
      style={{
        border: 0 + "px",
        boxShadow:
          "0px 1px 2px -2px rgba(0, 0, 0, 0.16), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09)",
        marginBottom: 10 + "px",
      }}
    >
      {/* Date,姓名,Shift,Client,Model,Specs,Output（KM),Notes */}
      <Form onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Worker"
              label="Worker"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Please choose..."
                onChange={(value) => handleChange(value, "worker")}
              >
                {workers.map((worker) => {
                  const data = { id: worker._id, name: worker.name };
                  return (
                    <Option value={JSON.stringify(data)}>{worker.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="Date" label="Date" rules={[{ required: true }]}>
              <DatePicker
                placeholder={"Please choose a date"}
                // defaultValue={moment(new Date(), "YYYY/MM/DD")}
                format={"YYYY/MM/DD"}
                onChange={(date, dateString) => {
                  handleChange(dateString, "date");
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="Shift" label="Shift" rules={[{ required: true }]}>
              <Select
                placeholder="Pleaser choose..."
                onChange={(value) => handleChange(value, "time")}
              >
                <Option value="day">day</Option>
                <Option value="night">night</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Client"
              label="Client"
              rules={[{ required: false }]}
            >
              <Input
                onChange={(event) => handleChange(event.target.value, "client")}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="Model" label="Model" rules={[{ required: false }]}>
              <Input
                onChange={(event) => handleChange(event.target.value, "model")}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="Specs" label="Specs" rules={[{ required: false }]}>
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "specification")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Output"
              label="Output"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(event) => handleChange(event.target.value, "amount")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="Notes" label="Notes" rules={[{ required: false }]}>
              <TextArea
                autoSize
                onChange={(event) => handleChange(event.target.value, "note")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Button block type="primary" htmlType="submit">
            Confirm and add
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default TaskForm;
