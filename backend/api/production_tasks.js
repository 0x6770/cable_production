const express = require("express");

const router = express.Router();

const Task_jichu = require("../models/task_jichu");
const Task_fuzhao = require("../models/task_fuzhao");
const ExecutingTask_jichu = require("../models/executing_task_jichu");
const ExecutingTask_fuzhao = require("../models/executing_task_fuzhao");

const taskQuery = require("../queries/all_tasks");

const User = require("../models/user");
const auth = require("../middleware/auth");

// Search tasks by keyword
router.get("/:type/search/:keyword", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Task_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Task_fuzhao;
  }
  Scheme.find(taskQuery(req.params.keyword)).exec((err, docs) =>
    res.send(docs)
  );
});

// Fetch All task
router.get("/:type/get", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Task_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Task_fuzhao;
  }
  Scheme.find({})
    .sort({ created_at: -1 })
    .exec((err, docs) => {
      if (err) {
        console.log("err", err);
      } else {
        res.send(docs.length > 0 ? docs : {});
      }
    });
});

// Find ONE task by ID
router.get("/:type/get/:id", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Task_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Task_fuzhao;
  }
  Scheme.findById(req.params.id, (err, result) => {
    res.send(result);
  });
});

// Find tasks by Machine Number
router.get("/:type/get/m/:number", (req, res) => {
  let Scheme;
  if (req.params.type == "jichu") {
    Scheme = Task_jichu;
  } else if (req.params.type == "fuzhao") {
    Scheme = Task_fuzhao;
  }
  Scheme.find({ machine_number: { $in: [req.params.number, ""] } })
    .sort({ created_at: -1 })
    .exec((err, docs) => {
      res.send(docs);
    });
});

// ADD task
router.post("/:type/add", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      let newTask;
      if (req.params.type == "jichu") {
        newTask = new Task_jichu({
          machine_number: req.body.machine_number,
          production_number: req.body.production_number,
          product_name: req.body.product_name,
          specification: req.body.specification,
          color: req.body.color,
          conductor_struct: req.body.conductor_struct,
          amount_planned: req.body.amount_planned,
          amount_finished: req.body.amount_finished,
          next_production_number: req.body.next_production_number,
          note: req.body.note,
          finished: false,
        });
      } else if (req.params.type == "fuzhao") {
        newTask = new Task_fuzhao({
          machine_number: req.body.machine_number,
          production_number: req.body.production_number,
          product_name: req.body.product_name,
          specification: req.body.specification,
          color: req.body.color,
          conductor_struct: req.body.conductor_struct,
          amount_planned: req.body.amount_planned,
          amount_finished: req.body.amount_finished,
          next_production_number: req.body.next_production_number,
          note: req.body.note,
          finished: false,
        });
      }

      newTask
        .save()
        .then(() => {
          res.json({ message: "success" });
        })
        .catch((err) => console.log(err));
    }
  });
});

// Delete task
router.delete("/:type/delete/:id", auth, (req, res) => {
  let valid = true;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      const taskID = req.params.id;
      let ProductionTask;
      let ExecutingTask;
      if (req.params.type == "jichu") {
        ProductionTask = Task_jichu;
        ExecutingTask = ExecutingTask_jichu;
      } else if (req.params.type == "fuzhao") {
        ProductionTask = Task_fuzhao;
        ExecutingTask = ExecutingTask_fuzhao;
      }
      ProductionTask.findOneAndRemove({ _id: taskID })
        .then(() => res.json({ message: "success" }))
        .catch((err) => console.log(err));
      ExecutingTask.findOneAndRemove({ task_id: taskID })
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  });
});

// Update task
router.put("/:type/update/:id", auth, (req, res) => {
  let valid = true;
  const taskID = req.params.id;
  User.findById(req.user.id, (err, user) => {
    if (
      (req.params.type === "jichu" &&
        !user.authority.includes("jichu_admin")) ||
      (req.params.type === "fuzhao" && !user.authority.includes("fuzhao_admin"))
    ) {
      valid = false;
      return res.status(400).json({ message: "无权限访问" });
    }
  }).then(() => {
    if (valid) {
      let Scheme;
      if (req.params.type == "jichu") {
        Scheme = Task_jichu;
      } else if (req.params.type == "fuzhao") {
        Scheme = Task_fuzhao;
      }

      Scheme.findByIdAndUpdate(taskID, req.body, (err) => {
        if (err) console.log(err);
      })
        .then(() => res.json({ message: "success" }))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
