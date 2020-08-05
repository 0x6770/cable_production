import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import TaskView from "./task/index.jsx";
import Productivity from "./productivity/index.jsx";

const Index = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route
          path={`${match.path}/plan_fuzhao`}
          component={() => <TaskView type="fuzhao" />}
        />
        <Route
          path={`${match.path}/plan_jichu`}
          component={() => <TaskView type="jichu" />}
        />
        <Route
          path={`${match.path}/productivity_jichu`}
          component={() => <Productivity type="jichu" />}
        />
        <Route
          path={`${match.path}/productivity_fuzhao`}
          component={() => <Productivity type="fuzhao" />}
        />
      </Switch>
    </Layout>
  );
};

export default Index;
