import React, { useState, useEffect } from "react";
import { Layout, PageHeader, message, Button } from "antd";

import UserTable from "./user_table.jsx";
import NavBar from "../../components/navbar.jsx";

import { getUsers } from "../../utils/api";

const { Content, Footer } = Layout;

const UserPage = () => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const [hidden, setHidden] = useState(isMobile);
  const [users, setUsers] = useState([]);

  const title = "Users Management";

  // fetch all the tasks on ComponentDidMount
  useEffect(() => {
    // Update the document title using the browser API
    getUsers()
      .then((res) => {
        if (res.data.message && res.data.message === "Invalid authority") {
          message.error("Permission denied");
        } else if (res.data.users && res.data.users.length) {
          setUsers(res.data.users);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.log("UserPage -> err", err);
        message.error(err);
      });
  }, []);

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
            <UserTable users={users} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Yujie Wang ©2020</Footer>
      </Layout>
    </>
  );
};

export default UserPage;
