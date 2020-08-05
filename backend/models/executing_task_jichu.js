const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExecutingTaskSchema_jichu = new Schema({
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

ExecutingTaskSchema_jichu.index({
  machine_number: "text",
  task_id: "text",
});

module.exports = ExecutingTask_jichu = mongoose.model(
  "executing_tasks_jichu",
  ExecutingTaskSchema_jichu
);
