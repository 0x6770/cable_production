const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Machine number,Production number,Product name,Specs,Structure,Planned Amount(km),Finished Amount(km),Next Prod number,Notes
const TaskSchema_jichu = new Schema({
  machine_number: {
    // Machine number
    type: String,
    required: false,
  },
  production_number: {
    // Production number
    type: String,
    required: true,
  },
  product_name: {
    // Product name
    type: String,
    required: true,
  },
  specification: {
    // Specs
    type: String,
    required: false,
  },
  color: {
    // Specs
    type: String,
    required: false,
  },
  conductor_struct: {
    // Structure
    type: String,
    required: false,
  },
  amount_planned: {
    // Planned Amount
    type: String,
    required: true,
  },
  amount_finished: {
    // Finished Amount
    type: String,
    required: true,
  },
  next_production_number: {
    // Next Prod number
    type: String,
    required: true,
  },
  note: {
    // Notes
    type: String,
    required: false,
  },
  finished: {
    // 是否完成
    type: Boolean,
    required: true,
  },
  created_at_string: {
    immutable: true,
    type: String,
    default: () => {
      const now = moment();
      return now.format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created_at: {
    type: Date,
    default: () => {
      const now = moment();
      return now;
    },
  },
});

TaskSchema_jichu.index({
  machine_number: "text",
  production_number: "text",
  product_name: "text",
  specification: "text",
  conductor_struct: "text",
  next_production_number: "text",
  note: "text",
  color: "text",
  note: "text",
  created_at_string: "text",
});

module.exports = Task_jichu = mongoose.model(
  "production_tasks_jichu",
  TaskSchema_jichu
);
