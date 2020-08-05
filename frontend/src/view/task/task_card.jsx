import React from "react";
import { Typography, Card, Progress } from "antd";

const { Title } = Typography;

const TaskCard = ({ task, type }) => {
  const amount_finished =
    task.amount_finished &&
    task.amount_planned.toString().match(/(\d+(\.\d+)?)/)
      ? task.amount_finished.toString().match(/(\d+(\.\d+)?)/)[0]
      : 0;
  const amount_planned =
    task.amount_planned && task.amount_planned.toString().match(/(\d+(\.\d+)?)/)
      ? task.amount_planned.toString().match(/(\d+(\.\d+)?)/)[0]
      : 1;
  const percentage = task.amount_planned
    ? ((amount_finished / amount_planned) * 100).toFixed(1)
    : (0.0).toFixed(1);

  return (
    <Card
      style={{
        position: "relative",
        border: 0 + "px",
        margin: 10 + "px",
        boxShadow:
          "0px 1px 2px -2px rgba(0, 0, 0, 0.16), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09)",
      }}
    >
      <Title level={3} style={{ position: "absolute" }}>
        #{task.machine_number}
      </Title>
      <Progress
        type="circle"
        width={type === "jichu" ? 200 : 320}
        strokeWidth={15}
        // success={{ percent: 100 }}
        percent={percentage}
        format={(percent) => {
          switch (percent) {
            case 0.0:
              return "pending";
            case 100.0:
              return "finished";
            default:
              return `${percent}%`;
          }
        }}
      />
    </Card>
  );
};

export default TaskCard;
