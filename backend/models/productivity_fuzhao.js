const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Date,姓名,Shift,Client,Model,Specs,Output（KM),Notes
const ProductivitySchema_fuzhao = new Schema({
  date: {
    //Date
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  worker: {
    type: String,
    required: true,
  },
  client: {
    // Client
    type: String,
    required: false,
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

ProductivitySchema_fuzhao.index({
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

module.exports = Task_fuzhao = mongoose.model(
  "productivity_fuzhao",
  ProductivitySchema_fuzhao
);
