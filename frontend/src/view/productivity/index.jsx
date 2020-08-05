import React, { useState, useEffect } from "react";
import { Space, Layout, Typography, Button } from "antd";

import ProductivityTableJichu from "./productivity_table_jichu.jsx";
import ProductivityTableFuzhao from "./productivity_table_fuzhao.jsx";
import NavBar from "../../components/navbar.jsx";

import { getProductivity } from "../../utils/api";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ProductivityPlan = ({ type }) => {
  // const isMobile = navigator.userAgent.match(
  //   /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  // );
  const [hidden, setHidden] = useState(true);
  const [productivity, setProductivity] = useState([]);
  let title = "";
  if (type === "fuzhao") {
    title = "Irradiation Process Productivity";
  } else if (type === "jichu") {
    title = "Extrusion Process Productivity";
  }

  const updateProductivity = () =>
    getProductivity(type).then((res) => {
      if (res.data.productivity.length === undefined) {
        setProductivity([]);
      } else {
        setProductivity(res.data.productivity);
      }
    });

  useEffect(() => {
    updateProductivity();
  }, [type]);

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
            // paddingTop: 40 + "px",
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
        </div>
        <Header style={{ backgroundColor: "#f0f2f5", padding: "0px 12px" }}>
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
        <Content
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}
        >
          <div style={{ minHeight: 360 }}>
            {type === "jichu" ? (
              <ProductivityTableJichu type={type} productivity={productivity} />
            ) : (
              <></>
            )}
            {type === "fuzhao" ? (
              <ProductivityTableFuzhao
                type={type}
                productivity={productivity}
              />
            ) : (
              <></>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Yujie Wang ©2020</Footer>
      </Layout>
    </>
  );
};

export default ProductivityPlan;
