import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Space } from "antd";
import {
  ProfileOutlined,
  CalendarOutlined,
  ContactsOutlined,
  UserOutlined,
  HomeOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

import AuthContext from "../context/auth_context";

const { Sider } = Layout;

const NavBar = ({ hidden }) => {
  const location = useLocation();
  const basePath = location.pathname.match(/^\/(\w*)/m)[0];
  const endPath = location.pathname.match(/\/(\w*)$/m)[1];

  return (
    <AuthContext.Consumer>
      {({ auth, updateAuth }) => {
        return (
          <Sider hidden={hidden} trigger={null}>
            <img
              alt={"logo"}
              style={{
                position: "sticky",
                top: 10 + "px",
                width: 160 + "px",
                height: 160 + "px",
                margin: "auto",
                padding: 20 + "px",
              }}
              src={process.env.PUBLIC_URL + "/logo_trans.png"}
            />
            <Menu
              theme="dark"
              mode="inline"
              hidden={basePath !== "/admin"}
              defaultSelectedKeys={[endPath]}
              style={{
                position: "sticky",
                top: 200 + "px",
                width: 100 + "%",
              }}
            >
              <Menu.ItemGroup
                hidden={
                  !(
                    auth.authority.includes("jichu_admin") ||
                    auth.authority.includes("fuzhao_admin")
                  )
                }
                key="plan"
                title={
                  <Space>
                    <ProfileOutlined />
                    Production Plan
                  </Space>
                }
              >
                <Menu.Item
                  hidden={!auth.authority.includes("jichu_admin")}
                  key="plan_jichu"
                >
                  Extrusion
                  <Link to={basePath + "/plan_jichu"} />
                </Menu.Item>
                <Menu.Item
                  hidden={!auth.authority.includes("fuzhao_admin")}
                  key="plan_fuzhao"
                >
                  Irradiation
                  <Link to={basePath + "/plan_fuzhao"} />
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup
                hidden={
                  !(
                    auth.authority.includes("jichu_admin") ||
                    auth.authority.includes("fuzhao_admin")
                  )
                }
                key="productivity"
                title={
                  <Space>
                    <CalendarOutlined />
                    Productivity
                  </Space>
                }
              >
                <Menu.Item
                  hidden={!auth.authority.includes("jichu_admin")}
                  key="productivity_jichu"
                >
                  Extrusion
                  <Link to={basePath + "/productivity_jichu"} />
                </Menu.Item>
                <Menu.Item
                  hidden={!auth.authority.includes("fuzhao_admin")}
                  key="productivity_fuzhao"
                >
                  Irradiation
                  <Link to={basePath + "/productivity_fuzhao"} />
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup
                hidden={
                  !(
                    auth.authority.includes("jichu_admin") ||
                    auth.authority.includes("fuzhao_admin")
                  )
                }
                key="workers"
                title={
                  <Space>
                    <UserOutlined />
                    Workers
                  </Space>
                }
              >
                <Menu.Item
                  hidden={!auth.authority.includes("jichu_admin")}
                  key="people_jichu"
                >
                  Extrusion
                  <Link to={basePath + "/people_jichu"} />
                </Menu.Item>
                <Menu.Item
                  hidden={!auth.authority.includes("fuzhao_admin")}
                  key="people_fuzhao"
                >
                  Irradiation
                  <Link to={basePath + "/people_fuzhao"} />
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Item hidden={!auth.admin} key="users">
                <Space>
                  <ContactsOutlined />
                  Users
                  <Link to={basePath + "/users"} />
                </Space>
              </Menu.Item>
            </Menu>
            <Menu
              theme="dark"
              mode="inline"
              hidden={basePath !== "/view"}
              defaultSelectedKeys={[endPath]}
              style={{
                position: "sticky",
                top: 200 + "px",
                width: 100 + "%",
              }}
            >
              <Menu.ItemGroup
                key="plan"
                title={
                  <Space>
                    <ProfileOutlined />
                    Production Plan
                  </Space>
                }
              >
                <Menu.Item key="plan_jichu">
                  Extrusion
                  <Link to={basePath + "/plan_jichu"} />
                </Menu.Item>
                <Menu.Item key="plan_fuzhao">
                  Irradiation
                  <Link to={basePath + "/plan_fuzhao"} />
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup
                key="productivity"
                title={
                  <Space>
                    <CalendarOutlined />
                    Productivity
                  </Space>
                }
              >
                <Menu.Item key="productivity_jichu">
                  Extrusion
                  <Link to={basePath + "/productivity_jichu"} />
                </Menu.Item>
                <Menu.Item key="productivity_fuzhao">
                  Irradiation
                  <Link to={basePath + "/productivity_fuzhao"} />
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
            <Menu
              theme="dark"
              mode="inline"
              style={{ position: "sticky", top: 80 + "%" }}
            >
              <Menu.Item icon={<HomeOutlined />}>
                Dashboard
                <Link to={"/view/plan_jichu"} />
              </Menu.Item>
              <Menu.Item icon={<DesktopOutlined />}>
                Backend
                <Link to={"/admin"} />
              </Menu.Item>
            </Menu>
          </Sider>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default NavBar;
