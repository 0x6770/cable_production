import React, { useState } from "react";
import {
  Form,
  Layout,
  Input,
  Button,
  Typography,
  PageHeader,
  message,
  Space,
} from "antd";
import { MobileOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

import NavBar from "../components/navbar.jsx";

import { login, signup, logout } from "../utils/api";

import AuthContext from "../context/auth_context";

const { Content } = Layout;
const { Text, Title } = Typography;

const Auth = ({ authed }) => {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const [hidden, setHidden] = useState(isMobile);
  const [loginState, setLoginState] = useState(true);
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const onSubmitLogin = async (values) => {
    login(values)
      .then((res) => {
        if (res.data.message === "success") {
          message.success("Login succeeded");
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        } else {
          message.fail("Login failed: error token");
        }
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          const errors = err.response.data.errors;
          errors
            ? errors.map((error) => message.error(error.message))
            : message.error(err.response.data.message);
        } else if (err.request) {
          // client never received a response, or request never left
          message.error("error connection to server");
        } else {
          // anything else
          message.error("unknown error");
        }
      });
  };

  const onSubmitReg = async (values) => {
    signup(values)
      .then((res) => {
        if (res.data.message === "success") {
          message.success("Registration succeeded");
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        } else {
          message.fail("Registrated failed: error token");
        }
      })
      .catch((err) => {
        if (err.response) {
          // console.log("onSubmitReg -> err.response", err.response);
          // client received an error response (5xx, 4xx)
          const errors = err.response.data.errors;
          errors
            ? errors.map((error) => message.error(error.message))
            : message.error(err.response.data.message);
        } else if (err.request) {
          // client never received a response, or request never left
          message.error("error connection to server");
        } else {
          // anything else
          message.error("unknown error");
        }
      });
  };

  return (
    <>
      {authed ? (
        <AuthContext.Consumer>
          {({ user, auth, updateAuth }) => {
            return (
              <>
                <NavBar hidden={hidden} />
                <Layout style={{ position: "relative" }}>
                  <PageHeader
                    title={" "}
                    onBack={() => setHidden(!hidden)}
                    backIcon={<Button type="primary">Menu</Button>}
                  ></PageHeader>
                  <Space
                    direction="vertical"
                    align="center"
                    style={{ width: 100 + "%", padding: 20, paddingTop: 120 }}
                  >
                    <Title level={1}>Hello {user}</Title>
                    <Text style={{ fontSize: "calc( 14px + 1vw )" }}>
                      Welcome to production management system. {<br />}
                      All avaliable operations are in the left pannel.
                    </Text>
                    <Button
                      type="danger"
                      size="large"
                      style={{ marginTop: 20 }}
                      onClick={() => {
                        logout().then((res) => {
                          if (res.data.message === "success") {
                            message.success("Logout succeeded");
                            setTimeout(() => {
                              window.location.reload(false);
                            }, 500);
                          } else {
                            message.fail(
                              "Logout failed: error connection to server"
                            );
                          }
                        });
                      }}
                    >
                      Log out
                    </Button>
                  </Space>
                </Layout>
              </>
            );
          }}
        </AuthContext.Consumer>
      ) : (
        <>
          <NavBar hidden={hidden} />
          <Layout style={{ position: "relative" }}>
            <PageHeader
              title={" "}
              onBack={() => setHidden(!hidden)}
              backIcon={<Button type="primary">Menu</Button>}
            ></PageHeader>
            <Content
              style={{
                position: "absolute",
                top: 50 + "%",
                left: 50 + "%",
                transform: "translate(-50%, -50%)",
                margin: "auto",
              }}
            >
              <Title level={2}>
                Production Management {loginState ? "Login" : "Registration"}
              </Title>
              {loginState ? (
                <Form
                  name="normal_login"
                  style={{ minWidth: 300 + "px" }}
                  initialValues={{ remember: true }}
                  onFinish={onSubmitLogin}
                >
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your registrated phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <MobileOutlined className="site-form-item-icon" />
                      }
                      placeholder="Phone number"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter password" },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 100 + "%" }}
                    >
                      Login
                    </Button>
                    Click here to
                    <Button
                      type="link"
                      onClick={() => {
                        setLoginState(false);
                      }}
                    >
                      Registration
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Form
                  name="normal_login"
                  style={{ minWidth: 300 + "px" }}
                  initialValues={{ remember: true }}
                  onFinish={onSubmitReg}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Please enter a user name" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="User name" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MobileOutlined />}
                      placeholder="Phone number"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a password(at least 6 dig/char)",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 100 + "%" }}
                    >
                      Registration
                    </Button>
                    registrated user please
                    <Button
                      type="link"
                      onClick={() => {
                        setLoginState(true);
                      }}
                    >
                      login
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Content>
          </Layout>
        </>
      )}
    </>
  );
};

export default Auth;
