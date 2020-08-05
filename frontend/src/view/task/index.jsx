import React, { useState, useEffect } from "react";
import { Button, Layout, Space, Typography } from "antd";

import TaskCards from "./task_cards.jsx";
import TaskTable from "./task_table.jsx";
// import Time from "../../components/time.jsx";
import NavBar from "../../components/navbar.jsx";

import { getExecutingTasks, getTaskById } from "../../utils/api";
import AuthContext from "../../context/auth_context";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const TaskView = ({ type }) => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const initialTasks =
    type === "jichu"
      ? [
          { Executing_machine_number: 1 },
          { Executing_machine_number: 2 },
          { Executing_machine_number: 3 },
          { Executing_machine_number: 4 },
          { Executing_machine_number: 5 },
          { Executing_machine_number: 6 },
        ]
      : [
          { Executing_machine_number: 1 },
          { Executing_machine_number: 2 },
          { Executing_machine_number: 3 },
          { Executing_machine_number: 4 },
        ];

  const [tasks, setTasks] = useState(initialTasks);
  // console.log("TaskView -> tasks", tasks);
  const [hidden, setHidden] = useState(true);

  let title = "";
  if (type === "fuzhao") {
    title = "Irradiation Process Production Plan";
  } else if (type === "jichu") {
    title = "Extrusion Process Production Plan";
  }

  const updateTasks = () =>
    getExecutingTasks(type).then((res) => {
      if (res.data.machines.length === undefined) {
        setTasks(initialTasks);
      } else {
        const newTasks = res.data.machines.map(async (machine) => {
          return getTaskById(type, machine.task_id).then((res) => {
            return { machine_number: machine.machine_number, data: res.data };
          });
        });
        Promise.all(newTasks).then((res) => {
          // console.log("TaskView -> res", res);
          let tasks_new = [...initialTasks];
          // console.log("TaskView -> tasks_new", tasks_new);
          initialTasks.map((task_i) => {
            return res.map((task_j) => {
              if (
                parseInt(task_i.Executing_machine_number) ===
                parseInt(task_j.machine_number)
              ) {
                // console.log("TaskView -> ...task_j.data,");
                // console.log("TaskView -> ...task_j.data,", task_j.data);
                tasks_new[task_i.Executing_machine_number - 1] = {
                  ...tasks_new[task_i.Executing_machine_number - 1],
                  ...task_j.data,
                };
              }
            });
          });
          setTasks(tasks_new);
        });
      }
    });

  useEffect(() => {
    const timer = setInterval(() => {
      updateTasks();
    }, 60000);
    return () => clearTimeout(timer);
  }, [type]);

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    updateTasks();
  }, [type]);

  return (
    <AuthContext.Consumer>
      {({ auth, updateAuth }) => {
        return (
          <>
            <NavBar hidden={hidden} />
            <Layout>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 12 + "px",
                }}
              >
                {hidden ? (
                  <Space size="large">
                    <img
                      alt={"logo"}
                      style={{
                        width: 100 + "px",
                        height: 100 + "px",
                        margin: "auto",
                      }}
                      src={process.env.PUBLIC_URL + "/logo_trans.png"}
                    />
                    <Title
                      level={1}
                      style={{
                        margin: 0,
                        fontSize: "calc(32px + 1.2vw)",
                        textAlign: "center",
                      }}
                    >
                      Production Management
                    </Title>
                  </Space>
                ) : (
                  <></>
                )}

                {/* {!hidden ? (
                  <></>
                ) : isMobile ? (
                  <></>
                ) : (
                  <Time
                    style={{
                      textAlign: "center",
                      fontSize: "calc(18px + 1.2vw)",
                      margin: 0 + "px",
                      color: "#777",
                      zIndex: 999,
                    }}
                  />
                )} */}
              </div>
              <Header
                style={{ backgroundColor: "#f0f2f5", padding: "0px 12px" }}
              >
                <Button
                  type="primary"
                  onClick={() => setHidden(!hidden)}
                  style={{
                    position: "absolute",
                    marginTop: 16 + "px",
                  }}
                >
                  Menu
                </Button>
                <Title
                  level={1}
                  style={{
                    fontSize: "calc(30px + 1vw)",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {title}
                </Title>
              </Header>
              <Content style={{ margin: "12px" }}>
                <TaskTable type={type} tasks={tasks} />
                <TaskCards type={type} tasks={tasks} />
              </Content>
              <Footer style={{ textAlign: "center" }}>Yujie Wang ©2020</Footer>
            </Layout>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default TaskView;
