import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import TaskPlan from "./task/index.jsx";
import Worker from "./worker/index.jsx";
import Auth from "./auth.jsx";
import Productivity from "./productivity/index.jsx";
import User from "./users/index.jsx";
import AuthContext from "../context/auth_context";

import { getMe } from "../utils/api";

const Index = ({ match }) => {
  const [authed, setAuthed] = useState(true);
  const [user, setUser] = useState("user");
  const [admin, setAdmin] = useState(true);
  const [authority, setAuthority] = useState(["fuzhao_admin", "jichu_admin"]);

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data.username);
        setAdmin(res.data.admin);
        setAuthority(res.data.authority);
        setAuthed(true);
      })
      .catch((err) => {
        setAuthed(false);
        console.log("Index -> err", err);
      });
  }, []);

  const updateAuth = (admin, authority) => {};

  return (
    <AuthContext.Provider
      value={{
        user: user,
        auth: { admin: admin, authority: authority },
        updateAuth: updateAuth,
      }}
    >
      <Layout>
        <Switch>
          <Route
            path={`${match.path}/`}
            exact
            component={() => <Auth authed={authed} />}
          />
          <Route
            path={`${match.path}/plan_fuzhao`}
            component={() => {
              return authed && authority.includes("fuzhao_admin") ? (
                <TaskPlan type="fuzhao" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/plan_jichu`}
            component={() => {
              return authed && authority.includes("jichu_admin") ? (
                <TaskPlan type="jichu" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/people_jichu`}
            component={() => {
              return authed && authority.includes("jichu_admin") ? (
                <Worker type="jichu" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/people_fuzhao`}
            component={() => {
              return authed && authority.includes("fuzhao_admin") ? (
                <Worker type="fuzhao" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/productivity_jichu`}
            component={() => {
              return authed && authority.includes("jichu_admin") ? (
                <Productivity type="jichu" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/productivity_fuzhao`}
            component={() => {
              return authed && authority.includes("fuzhao_admin") ? (
                <Productivity type="fuzhao" />
              ) : (
                <Redirect to={"/admin"} />
              );
            }}
          />
          <Route
            path={`${match.path}/users`}
            component={() => {
              return authed && admin ? <User /> : <Redirect to={"/admin"} />;
            }}
          />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
};

export default Index;
