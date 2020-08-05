import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import enUS from "antd/es/locale/en_US";
// import zhCN from "antd/es/locale/zh_CN";

import Admin from "./admin";
import Index from "./view";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return (
    <ConfigProvider autoInsertSpaceInButton={false} locale={enUS}>
      <BrowserRouter>
        <Layout style={{ minHeight: 100 + "vh" }}>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Redirect to={"/view/plan_jichu"} />}
            ></Route>
            <Route path="/view" component={Index}></Route>
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
