const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Machine number,Production number,Product name,Specs,Structure,Planned Amount(km),Finished Amount(km),Next Prod number,Notes
const WorkerScheme_fuzhao = new Schema({
  name: {
    // 姓名
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

WorkerScheme_fuzhao.index({
  name: "text",
});

module.exports = Task_jichu = mongoose.model(
  "worker_fuzhao",
  WorkerScheme_fuzhao
);
