const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExecutingTaskSchema_fuzhao = new Schema({
  machine_number: {
    // Machine number
    type: String,
    required: true,
  },
  task_id: {
    // 生产任务 ID
    type: String,
    required: true,
  },
});

ExecutingTaskSchema_fuzhao.index({
  machine_number: "text",
  task_id: "text",
});

module.exports = ExecutingTask_fuzhao = mongoose.model(
  "executing_tasks_fuzhao",
  ExecutingTaskSchema_fuzhao
);
