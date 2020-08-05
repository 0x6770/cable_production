import React from "react";

import TaskCard from "./task_card";

const TaskCards = ({ type, tasks }) => {
  return (
    <div
      style={{
        width: 100 + "%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflowX: "scroll",
        paddingTop: 20 + "px",
      }}
    >
      {tasks.map((task) => (
        <TaskCard type={type} task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TaskCards;
