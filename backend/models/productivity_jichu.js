const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Date,姓名,Shift,Production number,Process,Model,Specs（mm2）,Output（KM),机号,Notes
const ProductivitySchema_jichu = new Schema({
  date: {
    // Date
    type: String,
    required: true,
  },
  time: {
    // Shift
    type: String,
    required: true,
  },
  worker: {
    // 员工
    type: String,
    required: true,
  },
  machine_number: {
    // Machine number
    type: String,
    required: true,
  },
  production_number: {
    // Production number
    type: String,
    required: false,
  },
  process: {
    // Process
    type: String,
    required: true,
  },
  model: {
    // Model
    type: String,
    required: false,
  },
  specification: {
    // Specs
    type: String,
    required: false,
  },
  amount: {
    // Output
    type: String,
    required: true,
  },
  note: {
    // Notes
    type: String,
    required: false,
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

ProductivitySchema_jichu.index({
  machine_number: "text",
  production_number: "text",
  model: "text",
  specification: "text",
  time: "text",
  date: "text",
  note: "text",
  worker: "text",
  created_at_string: "text",
});

module.exports = Task_jichu = mongoose.model(
  "productivity_jichu",
  ProductivitySchema_jichu
);
