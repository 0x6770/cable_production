import React from "react";

import { Card, Form, Row, Col, Input, Button, Select, message } from "antd";

import { insertTask } from "../../utils/api";

const { Option } = Select;
const { TextArea } = Input;

const TaskFormFuzhao = ({ style }) => {
  const handleFormShow = () => {
    message.success("Operation succeeded: added new production task.");
    setTimeout(() => {
      window.location.reload(false);
    }, 800);
  };

  const initialFormData = {
    amount_finished: 0,
    amount_planned: 0,
    conductor_struct: "",
    machine_number: "",
    product_name: "",
    production_number: "",
    specification: "",
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (value, name) => {
    // console.log("handleChange -> value", value);
    const processedValue = typeof value === String ? value.trim() : value;
    setFormData({
      ...formData,

      // Trimming any whitespace
      [name]: processedValue,
    });
  };

  const handleSubmit = (e) => {
    insertTask("fuzhao", formData);
    handleFormShow();
  };

  return (
    <Card
      title={"Add new Irradiation task"}
      style={{
        border: 0 + "px",
        boxShadow:
          "0px 1px 2px -2px rgba(0, 0, 0, 0.16), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09)",
        marginBottom: 10 + "px",
      }}
    >
      <Form onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Machine number"
              label="Machine number"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Please choose..."
                onChange={(value) => handleChange(value, "machine_number")}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="Production number"
              label="Production number"
              rules={[{ required: false }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "production_number")
                }
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="Next Prod number"
              label="Next Prod number"
              rules={[{ required: false }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "next_production_number")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Product name"
              label="Product name"
              rules={[{ required: false }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "product_name")
                }
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

          <Col span={8}>
            <Form.Item name="Color" label="Color" rules={[{ required: false }]}>
              <Input
                onChange={(event) => handleChange(event.target.value, "color")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="Structure"
              label="Structure"
              rules={[{ required: false }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "conductor_struct")
                }
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="Planned Amount"
              label="Planned Amount"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "amount_planned")
                }
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="Finished Amount"
              label="Finished Amount"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(event) =>
                  handleChange(event.target.value, "amount_finished")
                }
              />
            </Form.Item>
          </Col>

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

export default TaskFormFuzhao;
