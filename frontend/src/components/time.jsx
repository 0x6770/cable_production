import React, { useState } from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Date = ({ style }) => {
  const [time, setTime] = useState("");
  const [dateString, setDateString] = useState("");
  setInterval(() => {
    const now = new window.Date();
    const s = (num) => {
      return num < 10 ? "0" + num : num;
    };
    setTime(
      s(now.getHours()) + ":" + s(now.getMinutes()) + ":" + s(now.getSeconds())
    );
    setDateString(
      s(now.getFullYear()) +
        "年" +
        s(now.getMonth() + 1) +
        "月" +
        s(now.getDate()) +
        "日"
    );
  }, 1000);

  return (
    <Title level={1} style={style}>
      {dateString}
      <br />
      {time}
    </Title>
  );
};

export default Date;
