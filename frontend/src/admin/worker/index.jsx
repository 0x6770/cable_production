import React, { useState, useEffect } from "react";
import { Space, Layout, PageHeader, Button } from "antd";

import WorkerForm from "./worker_form.jsx";
import WorkerTable from "./worker_table.jsx";
import NavBar from "../../components/navbar.jsx";

import { getWorkers } from "../../utils/api";

const { Content, Footer } = Layout;

const WorkerPlan = ({ type }) => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const [hidden, setHidden] = useState(isMobile);
  const [workers, setWorkers] = useState([]);
  let title = "";
  if (type === "fuzhao") {
    title = "Irradiation Process Workers";
  } else if (type === "jichu") {
    title = "Extrusion Process Workers";
  }

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    getWorkers(type).then((res) => {
      if (res.data.workers.length === undefined) {
        setWorkers([]);
      } else {
        setWorkers(res.data.workers);
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
            <Space size="large" direction="vertical">
              <WorkerForm type={type} />
              <WorkerTable type={type} workers={workers} />
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Yujie Wang ©2020</Footer>
      </Layout>
    </>
  );
};

export default WorkerPlan;
