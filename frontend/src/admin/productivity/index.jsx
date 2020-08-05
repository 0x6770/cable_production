import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button } from "antd";

import ProductivityFormFuzhao from "./productivity_form_fuzhao.jsx";
import ProductivityFormJichu from "./productivity_form_jichu.jsx";
import ProductivityTableFuzhao from "./productivity_table_fuzhao.jsx";
import ProductivityTableJichu from "./productivity_table_jichu.jsx";
import NavBar from "../../components/navbar.jsx";

import { getProductivity } from "../../utils/api";

const { Content, Footer } = Layout;

const ProductivityPlan = ({ type }) => {
  console.log("ProductivityPlan -> type", type);
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const [hidden, setHidden] = useState(isMobile);
  const [productivity, setProductivity] = useState([]);
  let title = "";
  if (type === "fuzhao") {
    title = "Irradiation Process Productivity";
  } else if (type === "jichu") {
    title = "Extrusion Process Productivity";
  }

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    getProductivity(type).then((res) => {
      console.log("res.data.productivity", res.data.productivity);
      if (res.data.productivity.length === undefined) {
        setProductivity([]);
      } else {
        setProductivity(res.data.productivity);
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
            {type === "fuzhao" ? (
              <>
                <ProductivityFormFuzhao productivity={productivity} />
                <ProductivityTableFuzhao
                  type={type}
                  productivity={productivity}
                />
              </>
            ) : (
              <></>
            )}
            {type === "jichu" ? (
              <>
                <ProductivityFormJichu productivity={productivity} />
                <ProductivityTableJichu
                  type={type}
                  productivity={productivity}
                />
              </>
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
