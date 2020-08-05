import React from "react";

import { Card, Form, Input, Button, message } from "antd";

import { insertWorker } from "../../utils/api";

const WorkerForm = ({ type }) => {
  let type_cn = "";
  if (type === "fuzhao") {
    type_cn = "Irradiation";
  } else if (type === "jichu") {
    type_cn = "Extrusion";
  }

  const handleFormShow = () => {
    message.success("Operation succeeded: Adding new worker.");
    setTimeout(() => {
      window.location.reload(false);
    }, 800);
  };

  const initialFormData = {
    name: "",
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (value, name) => {
    const processedValue = typeof value === String ? value.trim() : value;
    setFormData({
      ...formData,

      // Trimming any whitespace
      [name]: processedValue,
    });
  };

  const handleSubmit = (e) => {
    // ... submit to API or something
    insertWorker(type, formData);
    handleFormShow();
  };

  return (
    <>
      <Card
        title={"Add new worker for" + type_cn + " process"}
        style={{
          border: 0 + "px",
          boxShadow:
            "0px 1px 2px -2px rgba(0, 0, 0, 0.16), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09)",
        }}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
            <Input
              onChange={(event) => handleChange(event.target.value, "name")}
            />
          </Form.Item>

          <Button block type="primary" htmlType="submit">
            Confirm and add
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default WorkerForm;
