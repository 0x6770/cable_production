import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button } from "antd";

import TaskFormJichu from "./task_form_jichu.jsx";
import TaskFormFuzhao from "./task_form_fuzhao.jsx";
import TaskTable from "./task_table.jsx";
import NavBar from "../../components/navbar.jsx";

import { getTasks } from "../../utils/api";

const { Content, Footer } = Layout;

const TaskPlan = ({ type }) => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const [hidden, setHidden] = useState(isMobile);
  const [tasks, setTasks] = useState([]);
  let title = "";
  if (type === "fuzhao") {
    title = "Irradiation Process Production Plan";
  } else if (type === "jichu") {
    title = "Extrusion Process Production Plan";
  }

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    getTasks(type).then((res) => {
      if (res.data && res.data.length) {
        setTasks(res.data);
      } else {
        setTasks([]);
      }
    });
  }, [type]);

  return (
    <>
      <NavBar hidden={hidden} />
      <Layout>
        <PageHeader
          title={title}
          onBack={() => setHidden(!hidden)}
          backIcon={<Button type="primary">Menu</Button>}
        ></PageHeader>
        <Content style={{ margin: "20px" }}>
          <div
            style={{
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {type === "jichu" ? (
              <TaskFormJichu type={type} tasks={tasks} />
            ) : (
              <TaskFormFuzhao type={type} tasks={tasks} />
            )}
            <TaskTable type={type} tasks={tasks} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Yujie Wang ©2020</Footer>
      </Layout>
    </>
  );
};

export default TaskPlan;
